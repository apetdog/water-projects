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

# 清屏
clear

# 模拟主机名
HOST="${RED}root@darknet-core${RESET}:${BLUE}~/exploits${RESET}# "

# 定义几个不同的输出块
BLOCKS=(
# 短消息：拒绝访问
"
${RED}[!] ACCESS DENIED${RESET}
${RED}[!] Insufficient privileges to execute this command.${RESET}
${GRAY}Audit log updated: event_id=9923${RESET}
"

# 短消息：Ping
"
${CYAN}Pinging target-system (192.168.1.55) with 32 bytes of data:${RESET}
Reply from 192.168.1.55: bytes=32 time=2ms TTL=64
Reply from 192.168.1.55: bytes=32 time=3ms TTL=64
Reply from 192.168.1.55: bytes=32 time=2ms TTL=64
Reply from 192.168.1.55: bytes=32 time=2ms TTL=64

${GREEN}Ping statistics for 192.168.1.55:${RESET}
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
"

# 短消息：正在连接
"
${BLUE}[*] Initiating satellite uplink...${RESET}
${YELLOW}[...] Handshaking with satellite G-14${RESET}
${GREEN}[+] Connection established.${RESET}
${GRAY}Latency: 450ms | Jitter: 12ms${RESET}
"

# 中等：Nmap Scan
"
${GREEN}[+] Initializing Nmap Scan...${RESET}
${GRAY}Starting Nmap 7.92 ( https://nmap.org ) at 2024-03-15 13:37 EST${RESET}
Nmap scan report for ${WHITE}target-system.corp${RESET} (${YELLOW}192.168.1.55${RESET})
Host is up (0.0023s latency).
Not shown: 995 closed ports
PORT     STATE SERVICE    VERSION
21/tcp   open  ftp        ${CYAN}vsftpd 2.3.4${RESET}
22/tcp   open  ssh        ${CYAN}OpenSSH 4.7p1 Debian 8ubuntu1${RESET}
80/tcp   open  http       ${CYAN}Apache httpd 2.2.8 ((Ubuntu) DAV/2)${RESET}
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
${MAGENTA}Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel${RESET}
"

# 中等：Metasploit
"
${BLUE}[*] Metasploit Framework Console${RESET}
${WHITE}msf6 >${RESET} use exploit/unix/ftp/vsftpd_234_backdoor
${WHITE}msf6 exploit(unix/ftp/vsftpd_234_backdoor) >${RESET} set RHOSTS 192.168.1.55
RHOSTS => 192.168.1.55
${WHITE}msf6 exploit(unix/ftp/vsftpd_234_backdoor) >${RESET} run

${GREEN}[+]${RESET} 192.168.1.55:21 - Banner: 220 (vsFTPd 2.3.4)
${GREEN}[+]${RESET} 192.168.1.55:21 - USER: 331 Please specify the password.
${GREEN}[+]${RESET} 192.168.1.55:21 - Backdoor service has been spawned, handling...
${GREEN}[+]${RESET} Found shell.
${WHITE}[!] Command shell session 1 opened (192.168.1.10:4444 -> 192.168.1.55:6200)${RESET}
"

# 中等：Compiling
"
${CYAN}Compiling payload...${RESET}
gcc -o exploit exploit.c -fno-stack-protector -z execstack
exploit.c: In function ‘main’:
exploit.c:15:5: ${MAGENTA}warning:${RESET} implicit declaration of function ‘gets’; did you mean ‘fgets’? [-Wimplicit-function-declaration]
     gets(buffer);
     ^~~~
     fgets
/usr/bin/ld: /tmp/ccQ2w8s9.o: in function \`main':
exploit.c:(.text+0x24): warning: the \`gets' function is dangerous and should not be used.
${GREEN}[+] Build successful.${RESET}
"

# 长：Brute force
"
${GRAY}[SYSTEM]${RESET} Brute forcing SSH credentials...
${RED}[-]${RESET} root:123456 - Failed
${RED}[-]${RESET} root:password - Failed
${RED}[-]${RESET} root:toor - Failed
${RED}[-]${RESET} admin:admin - Failed
${RED}[-]${RESET} user:1234 - Failed
${RED}[-]${RESET} user:password - Failed
${RED}[-]${RESET} guest:guest - Failed
${RED}[-]${RESET} test:test - Failed
${RED}[-]${RESET} root:root - Failed
${RED}[-]${RESET} admin:123456 - Failed
${RED}[-]${RESET} service:service - Failed
${RED}[-]${RESET} deploy:deploy - Failed
${RED}[-]${RESET} oracle:oracle - Failed
${RED}[-]${RESET} postgres:postgres - Failed
${RED}[-]${RESET} mysql:mysql - Failed
${RED}[-]${RESET} apache:apache - Failed
${RED}[-]${RESET} tomcat:tomcat - Failed
${RED}[-]${RESET} weblogic:weblogic - Failed
${RED}[-]${RESET} support:support - Failed
${RED}[-]${RESET} ftp:ftp - Failed
${RED}[-]${RESET} backup:backup - Failed
${RED}[-]${RESET} git:git - Failed
${RED}[-]${RESET} jenkins:jenkins - Failed
${RED}[-]${RESET} docker:docker - Failed
${RED}[-]${RESET} kubernetes:kubernetes - Failed
${RED}[-]${RESET} ubuntu:ubuntu - Failed
${RED}[-]${RESET} centos:centos - Failed
${RED}[-]${RESET} ec2-user:ec2-user - Failed
${RED}[-]${RESET} vagrant:vagrant - Failed
${RED}[-]${RESET} pi:raspberry - Failed
${GREEN}[+]${RESET} admin:P@ssw0rd123 - ${BOLD}SUCCESS!${RESET}
${BLUE}[*]${RESET} Establishing encrypted tunnel...
${GREEN}[OK]${RESET} AES-256 connection established.
"

# 超长：Hex Dump
"
${YELLOW}dumping memory range 0x08048000-0x08049000${RESET}
08048000  7f 45 4c 46 01 01 01 00  00 00 00 00 00 00 00 00  |.ELF............|
08048010  02 00 03 00 01 00 00 00  54 80 04 08 34 00 00 00  |........T...4...|
08048020  2c 00 00 00 00 00 00 00  34 00 20 00 01 00 00 00  |,.......4. .....|
08048030  00 00 00 00 01 00 00 00  00 00 00 00 00 80 04 08  |................|
08048040  00 80 04 08 0c 01 00 00  0c 01 00 00 05 00 00 00  |................|
08048050  00 10 00 00 01 00 00 00  0c 01 00 00 0c 11 04 08  |................|
08048060  0c 11 04 08 0c 00 00 00  0c 00 00 00 06 00 00 00  |................|
08048070  00 10 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048080  01 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048090  45 00 00 00 00 00 00 00  50 e5 74 64 06 00 00 00  |E.......P.td....|
080480a0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
080480b0  04 00 00 00 10 00 00 00  01 00 00 00 47 4e 55 00  |............GNU.|
080480c0  00 00 00 00 02 00 00 00  06 00 00 00 20 00 00 00  |............ ...|
080480d0  03 00 00 00 47 4e 55 00  9a c9 52 48 3e 8d 2e 02  |....GNU...RH>...|
080480e0  7f 45 4c 46 01 01 01 00  00 00 00 00 00 00 00 00  |.ELF............|
080480f0  02 00 03 00 01 00 00 00  54 80 04 08 34 00 00 00  |........T...4...|
08048100  2c 00 00 00 00 00 00 00  34 00 20 00 01 00 00 00  |,.......4. .....|
08048110  00 00 00 00 01 00 00 00  00 00 00 00 00 80 04 08  |................|
08048120  00 80 04 08 0c 01 00 00  0c 01 00 00 05 00 00 00  |................|
08048130  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048140  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048150  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048160  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048170  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048180  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048190  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
080481a0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
080481b0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
080481c0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
080481d0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
080481e0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
080481f0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048200  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048210  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
08048220  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
${RED}[CRITICAL] Password hash found in heap memory!${RESET}
"

# 巨长：Package Install
"
${GREEN}[+] Updating package lists...${RESET}
${GRAY}Hit:1 http://security.ubuntu.com/ubuntu jammy-security InRelease${RESET}
${GRAY}Hit:2 http://archive.ubuntu.com/ubuntu jammy InRelease${RESET}
${GRAY}Hit:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease${RESET}
${GRAY}Hit:4 http://archive.ubuntu.com/ubuntu jammy-backports InRelease${RESET}
${WHITE}Reading package lists... Done${RESET}
${WHITE}Building dependency tree... Done${RESET}
${WHITE}Reading state information... Done${RESET}
${CYAN}The following additional packages will be installed:${RESET}
  libpython3.10-minimal libpython3.10-stdlib python3.10-minimal python3-distutils python3-lib2to3
  python3-pkg-resources python3-setuptools python3.10
${CYAN}Suggested packages:${RESET}
  python3-doc python3-tk python3-venv python3.10-venv python3.10-doc binfmt-support
${GREEN}The following NEW packages will be installed:${RESET}
  python3-pip
${GREEN}The following packages will be upgraded:${RESET}
  libpython3.10-minimal libpython3.10-stdlib python3.10-minimal python3-distutils python3-lib2to3
  python3-pkg-resources python3-setuptools python3.10
8 upgraded, 1 newly installed, 0 to remove and 12 not upgraded.
Need to get 14.2 MB of archives.
After this operation, 3,482 kB of additional disk space will be used.
${YELLOW}Do you want to continue? [Y/n] Y${RESET}
${GRAY}Get:1 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10-minimal amd64 3.10.6-1~22.04.2 [810 kB]${RESET}
${GRAY}Get:2 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3.10-minimal amd64 3.10.6-1~22.04.2 [2,058 kB]${RESET}
${GRAY}Get:3 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10-stdlib amd64 3.10.6-1~22.04.2 [1,837 kB]${RESET}
${GRAY}Get:4 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3.10 amd64 3.10.6-1~22.04.2 [514 kB]${RESET}
${GRAY}Get:5 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-lib2to3 all 3.10.6-1~22.04.2 [77.4 kB]${RESET}
${GRAY}Get:6 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-distutils all 3.10.6-1~22.04.2 [137 kB]${RESET}
${GRAY}Get:7 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-setuptools all 59.6.0-1.2ubuntu0.22.04.1 [339 kB]${RESET}
${GRAY}Get:8 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 python3-pip all 22.0.2+dfsg-1ubuntu0.2 [1,304 kB]${RESET}
${WHITE}Fetched 14.2 MB in 2s (6,854 kB/s)${RESET}
(Reading database ... 204851 files and directories currently installed.)
Preparing to unpack .../libpython3.10-minimal_3.10.6-1~22.04.2_amd64.deb ...
Unpacking libpython3.10-minimal:amd64 (3.10.6-1~22.04.2) over (3.10.4-3ubuntu0.1) ...
Preparing to unpack .../python3.10-minimal_3.10.6-1~22.04.2_amd64.deb ...
Unpacking python3.10-minimal (3.10.6-1~22.04.2) over (3.10.4-3ubuntu0.1) ...
Preparing to unpack .../libpython3.10-stdlib_3.10.6-1~22.04.2_amd64.deb ...
Unpacking libpython3.10-stdlib:amd64 (3.10.6-1~22.04.2) over (3.10.4-3ubuntu0.1) ...
Preparing to unpack .../python3.10_3.10.6-1~22.04.2_amd64.deb ...
Unpacking python3.10 (3.10.6-1~22.04.2) over (3.10.4-3ubuntu0.1) ...
Preparing to unpack .../python3-lib2to3_3.10.6-1~22.04.2_all.deb ...
Unpacking python3-lib2to3 (3.10.6-1~22.04.2) over (3.10.4-0ubuntu1) ...
Preparing to unpack .../python3-distutils_3.10.6-1~22.04.2_all.deb ...
Unpacking python3-distutils (3.10.6-1~22.04.2) over (3.10.4-0ubuntu1) ...
Setting up libpython3.10-minimal:amd64 (3.10.6-1~22.04.2) ...
Setting up python3.10-minimal (3.10.6-1~22.04.2) ...
Setting up libpython3.10-stdlib:amd64 (3.10.6-1~22.04.2) ...
Setting up python3-lib2to3 (3.10.6-1~22.04.2) ...
Setting up python3-distutils (3.10.6-1~22.04.2) ...
Setting up python3.10 (3.10.6-1~22.04.2) ...
Setting up python3-pip (22.0.2+dfsg-1ubuntu0.2) ...
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for install-info (6.8-4build1) ...
${GREEN}[+] Installation completed successfully.${RESET}
"

# 巨长：SQL Dump
"
${BLUE}[*] Starting SQLMap 1.5.8#stable${RESET}
${WHITE}[14:22:15] [INFO] testing connection to the target URL${RESET}
${WHITE}[14:22:16] [INFO] checking if the target is protected by some WAF/IPS${RESET}
${WHITE}[14:22:17] [INFO] testing if the target URL content is stable${RESET}
${WHITE}[14:22:18] [INFO] target URL content is stable${RESET}
${WHITE}[14:22:18] [INFO] testing if GET parameter 'id' is dynamic${RESET}
${WHITE}[14:22:18] [INFO] GET parameter 'id' appears to be dynamic${RESET}
${WHITE}[14:22:19] [INFO] heuristic (basic) test shows that GET parameter 'id' might be injectable (possible DBMS: 'MySQL')${RESET}
${WHITE}[14:22:20] [INFO] testing for SQL injection on GET parameter 'id'${RESET}
${GREEN}[14:22:20] [INFO] GET parameter 'id' is 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)' injectable${RESET}
${WHITE}[14:22:20] [INFO] checking if the injection point on GET parameter 'id' is a false positive${RESET}
${WHITE}[14:22:25] [INFO] GET parameter 'id' is vulnerable. Do you want to keep testing the others (if any)? [y/N] N${RESET}
${WHITE}[14:22:26] [INFO] the back-end DBMS is MySQL${RESET}
${WHITE}[14:22:26] [INFO] fetching database names${RESET}
${WHITE}[14:22:26] [INFO] fetching tables for database: 'users'${RESET}
${WHITE}[14:22:27] [INFO] fetching columns for table 'admin_users' in database 'users'${RESET}
${WHITE}[14:22:27] [INFO] fetching entries for table 'admin_users' in database 'users'${RESET}
${YELLOW}Database: users
Table: admin_users
[14 entries]
+----+----------+----------------------------------+---------------------+
| id | username | password_hash                    | last_login          |
+----+----------+----------------------------------+---------------------+
| 1  | admin    | 5f4dcc3b5aa765d61d8327deb882cf99 | 2024-03-15 10:00:01 |
| 2  | root     | 8d969eef6ecad3c29a3a629280e686cf | 2024-03-14 23:59:59 |
| 3  | support  | 098f6bcd4621d373cade4e832627b4f6 | 2024-03-15 08:30:00 |
| 4  | dev_team | 1a1dc91c907325c69271ddf0c944bc72 | 2024-03-15 09:15:22 |
| 5  | manager  | 21232f297a57a5a743894a0e4a801fc3 | 2024-03-13 14:22:11 |
| 6  | test     | e10adc3949ba59abbe56e057f20f883e | 2024-02-28 11:11:11 |
| 7  | guest    | 084e0343a0486ff05530df6c705c8bb4 | 2024-03-01 12:00:00 |
| 8  | backup   | 4a7d1ed414474e4033ac29ccb8653d9b | 2024-03-15 01:00:00 |
| 9  | api_user | 7c4a8d09ca3762af61e59520943dc264 | 2024-03-15 14:22:00 |
| 10 | system   | 87d9bb400c0634691f0e3baaf1e2fd0d | 2024-03-15 00:00:01 |
| 11 | audit    | b0baee9d279d34fa1dfd71aadb908c3f | 2024-03-10 09:45:33 |
| 12 | finance  | f5bb0c8de146c67b44babbf4e6584cc0 | 2024-03-14 16:20:10 |
| 13 | hr       | c4ca4238a0b923820dcc509a6f75849b | 2024-03-14 10:10:10 |
| 14 | security | c81e728d9d4c2f636f067f89cc14862c | 2024-03-15 13:00:00 |
+----+----------+----------------------------------+---------------------+${RESET}
${GREEN}[14:22:28] [INFO] table 'admin_users' dumped to CSV file '/home/user/.sqlmap/output/dump/admin_users.csv'${RESET}
"
)

# 欢迎信息
echo -e "${BOLD}Advanced Terminal Simulator v2.0${RESET}"
echo -e "Type any command and press ENTER to simulate execution."
echo ""

while true; do
    # 显示提示符并等待用户输入
    # -e 允许 readline 处理
    # -p 提示符
    echo -ne "$HOST"
    read input
    
    # 如果用户输入 exit 或 quit，退出
    if [[ "$input" == "exit" || "$input" == "quit" ]]; then
        break
    fi
    
    # 随机选择一个输出块
    # RANDOM 是 bash 的内置随机数变量
    # ${#BLOCKS[@]} 是数组长度
    idx=$((RANDOM % ${#BLOCKS[@]}))
    content="${BLOCKS[$idx]}"
    
    # 模拟“思考”或“加载”时间
    sleep 0.2
    
    # 逐行输出，营造打字机或日志刷新的效果
    # 设置 IFS 为换行符，防止 read 去除每行的前导空格
    while IFS= read -r line; do
        echo -e "$line"
        # 随机微小延迟，模拟真实输出速度
        sleep $(awk "BEGIN {print 0.01 + $RANDOM/32767 * 0.05}")
    done <<< "$content"
    
    echo ""
done

echo -e "${GREEN}Session terminated.${RESET}"
