#!/bin/bash

# 炫酷终端演示脚本
# 模拟系统扫描、入侵检测、网络监控等场景

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
GRAY='\033[0;90m'
BOLD='\033[1m'
BLINK='\033[5m'
RESET='\033[0m'

# 清屏并隐藏光标
clear
tput civis

# 捕获退出信号，恢复光标
trap 'tput cnorm; exit' INT TERM

# 生成随机IP地址
random_ip() {
    echo "$((RANDOM % 256)).$((RANDOM % 256)).$((RANDOM % 256)).$((RANDOM % 256))"
}

# 生成随机端口
random_port() {
    echo "$((RANDOM % 65535 + 1))"
}

# 生成随机MAC地址
random_mac() {
    printf '%02X:%02X:%02X:%02X:%02X:%02X' $((RANDOM%256)) $((RANDOM%256)) $((RANDOM%256)) $((RANDOM%256)) $((RANDOM%256)) $((RANDOM%256))
}

# 生成随机哈希值
random_hash() {
    echo $(head /dev/urandom | md5sum | cut -d' ' -f1)
}

# 进度条动画
progress_bar() {
    local duration=$1
    local msg=$2
    local width=50
    echo -ne "${CYAN}${msg}${RESET} ["
    for ((i=0; i<=width; i++)); do
        echo -ne "${GREEN}█${RESET}"
        echo -ne "${GRAY}"
        for ((j=i; j<width; j++)); do echo -ne "░"; done
        echo -ne "${RESET}] $((i*100/width))%\r"
        echo -ne "${CYAN}${msg}${RESET} ["
        sleep $(echo "scale=3; $duration/$width" | bc)
    done
    echo -e "${CYAN}${msg}${RESET} [${GREEN}$(printf '█%.0s' {1..50})${RESET}] 100%"
}

# 系统扫描模拟
system_scan() {
    echo -e "${BOLD}${CYAN}==================== 系统安全扫描 ====================${RESET}"
    local files=("kernel32.dll" "ntdll.sys" "hal.dll" "boot.ini" "registry.dat" 
                 "system32.exe" "winlogon.exe" "csrss.exe" "services.exe" "lsass.exe")
    
    for file in "${files[@]}"; do
        local status=$((RANDOM % 10))
        echo -ne "${GRAY}[$(date '+%H:%M:%S')]${RESET} 扫描文件: ${WHITE}$file${RESET} ... "
        sleep 0.3
        if [ $status -gt 7 ]; then
            echo -e "${RED}[可疑]${RESET} - 发现异常行为"
        else
            echo -e "${GREEN}[安全]${RESET}"
        fi
    done
    echo ""
}

# 网络监控模拟
network_monitor() {
    echo -e "${BOLD}${MAGENTA}==================== 网络流量监控 ====================${RESET}"
    local protocols=("TCP" "UDP" "ICMP" "HTTP" "HTTPS" "SSH" "FTP" "DNS")
    
    for ((i=0; i<15; i++)); do
        local proto=${protocols[$((RANDOM % ${#protocols[@]}))]}
        local src_ip=$(random_ip)
        local dst_ip=$(random_ip)
        local src_port=$(random_port)
        local dst_port=$(random_port)
        local bytes=$((RANDOM % 10000 + 100))
        
        if [ $((RANDOM % 10)) -gt 7 ]; then
            echo -e "${GRAY}[$(date '+%H:%M:%S.%3N')]${RESET} ${RED}[警告]${RESET} ${proto} ${src_ip}:${src_port} → ${dst_ip}:${dst_port} | ${bytes}B ${RED}可疑流量${RESET}"
        else
            echo -e "${GRAY}[$(date '+%H:%M:%S.%3N')]${RESET} ${GREEN}[正常]${RESET} ${proto} ${src_ip}:${src_port} → ${dst_ip}:${dst_port} | ${bytes}B"
        fi
        sleep 0.2
    done
    echo ""
}

# 入侵检测模拟
intrusion_detection() {
    echo -e "${BOLD}${YELLOW}==================== 入侵检测系统 ====================${RESET}"
    local attack_types=("SQL注入" "XSS攻击" "暴力破解" "DDoS攻击" "端口扫描" "恶意脚本")
    
    for ((i=0; i<12; i++)); do
        local attack=${attack_types[$((RANDOM % ${#attack_types[@]}))]}
        local ip=$(random_ip)
        local severity=$((RANDOM % 3))
        
        case $severity in
            0)
                echo -e "${GRAY}[$(date '+%H:%M:%S')]${RESET} ${GREEN}[低危]${RESET} 检测到尝试: ${attack} 来自 ${ip} - 已拦截"
                ;;
            1)
                echo -e "${GRAY}[$(date '+%H:%M:%S')]${RESET} ${YELLOW}[中危]${RESET} 检测到攻击: ${attack} 来自 ${ip} - 正在处理"
                ;;
            2)
                echo -e "${GRAY}[$(date '+%H:%M:%S')]${RESET} ${RED}[高危]${RESET} 检测到严重攻击: ${attack} 来自 ${ip} - ${RED}立即阻断${RESET}"
                ;;
        esac
        sleep 0.25
    done
    echo ""
}

# 防火墙规则更新
firewall_update() {
    echo -e "${BOLD}${BLUE}==================== 防火墙规则更新 ====================${RESET}"
    
    for ((i=0; i<8; i++)); do
        local ip=$(random_ip)
        local port=$(random_port)
        local action=("ACCEPT" "DROP" "REJECT")
        local chosen_action=${action[$((RANDOM % ${#action[@]}))]}
        
        echo -ne "${GRAY}[$(date '+%H:%M:%S')]${RESET} 更新规则: ${ip}:${port} → "
        case $chosen_action in
            "ACCEPT")
                echo -e "${GREEN}${chosen_action}${RESET}"
                ;;
            "DROP"|"REJECT")
                echo -e "${RED}${chosen_action}${RESET}"
                ;;
        esac
        sleep 0.3
    done
    echo ""
}

# 病毒数据库更新
virus_db_update() {
    echo -e "${BOLD}${CYAN}==================== 病毒数据库更新 ====================${RESET}"
    progress_bar 2 "下载病毒特征库"
    echo -e "${GREEN}✓${RESET} 已更新 ${WHITE}127,843${RESET} 个病毒定义"
    echo -e "${GREEN}✓${RESET} 数据库版本: ${WHITE}$(date '+%Y%m%d')${RESET}"
    echo ""
}

# 加密通信建立
crypto_handshake() {
    echo -e "${BOLD}${MAGENTA}==================== 安全连接建立 ====================${RESET}"
    local steps=("生成RSA密钥对" "交换公钥" "验证证书" "协商加密算法" "建立安全隧道")
    
    for step in "${steps[@]}"; do
        echo -ne "${GRAY}[$(date '+%H:%M:%S')]${RESET} ${step} ... "
        sleep 0.4
        echo -e "${GREEN}完成${RESET}"
    done
    echo -e "${GREEN}✓${RESET} 加密通道已建立 | 算法: ${WHITE}AES-256-GCM${RESET} | 密钥: ${GRAY}$(random_hash | cut -c1-16)${RESET}"
    echo ""
}

# 系统资源监控
resource_monitor() {
    echo -e "${BOLD}${YELLOW}==================== 系统资源监控 ====================${RESET}"
    
    for ((i=0; i<10; i++)); do
        local cpu=$((RANDOM % 100))
        local mem=$((RANDOM % 100))
        local disk=$((RANDOM % 100))
        local net=$((RANDOM % 1000))
        
        echo -e "${GRAY}[$(date '+%H:%M:%S')]${RESET} CPU: ${CYAN}${cpu}%${RESET} | 内存: ${YELLOW}${mem}%${RESET} | 磁盘: ${MAGENTA}${disk}%${RESET} | 网络: ${GREEN}${net}KB/s${RESET}"
        sleep 0.3
    done
    echo ""
}

# 日志分析
log_analysis() {
    echo -e "${BOLD}${WHITE}==================== 日志分析 ====================${RESET}"
    local log_types=("访问日志" "错误日志" "安全日志" "审计日志")
    
    for log_type in "${log_types[@]}"; do
        local count=$((RANDOM % 10000 + 1000))
        echo -e "${GRAY}[$(date '+%H:%M:%S')]${RESET} 分析${log_type}: ${WHITE}${count}${RESET} 条记录"
        local anomalies=$((RANDOM % 50))
        if [ $anomalies -gt 30 ]; then
            echo -e "  └─ ${RED}发现 ${anomalies} 条异常记录${RESET}"
        else
            echo -e "  └─ ${GREEN}未发现异常${RESET}"
        fi
        sleep 0.3
    done
    echo ""
}

# 世界地图攻击来源显示
world_map_attacks() {
    echo -e "${BOLD}${CYAN}🌍 ==================== 世界地图攻击来源 ====================${RESET}"
    
    # 国家列表和对应的国旗/标识
    declare -A countries=(
        ["CN"]="🇨🇳 中国"
        ["US"]="🇺🇸 美国"
        ["RU"]="🇷🇺 俄罗斯"
        ["JP"]="🇯🇵 日本"
        ["KR"]="🇰🇷 韩国"
        ["DE"]="🇩🇪 德国"
        ["GB"]="🇬🇧 英国"
        ["FR"]="🇫🇷 法国"
        ["BR"]="🇧🇷 巴西"
        ["IN"]="🇮🇳 印度"
        ["AU"]="🇦🇺 澳大利亚"
        ["CA"]="🇨🇦 加拿大"
    )
    
    # 攻击类型
    local attack_types=("DDoS" "端口扫描" "SQL注入" "暴力破解" "恶意软件" "钓鱼攻击")
    
    # 简化的ASCII世界地图
    echo -e "${GRAY}"
    echo "        ┌─────────────────────────────────────────┐"
    echo "        │         🌍 全球攻击来源分布图            │"
    echo "        └─────────────────────────────────────────┘"
    echo -e "${RESET}"
    
    # 显示攻击来源
    local country_codes=("CN" "US" "RU" "JP" "KR" "DE" "GB" "FR" "BR" "IN" "AU" "CA")
    
    for ((i=0; i<10; i++)); do
        local country_code=${country_codes[$((RANDOM % ${#country_codes[@]}))]}
        local country_name=${countries[$country_code]}
        local ip=$(random_ip)
        local attack=${attack_types[$((RANDOM % ${#attack_types[@]}))]}
        local count=$((RANDOM % 500 + 10))
        local severity=$((RANDOM % 3))
        
        # 根据严重程度显示不同颜色
        case $severity in
            0)
                local color="${GREEN}"
                local level="低"
                ;;
            1)
                local color="${YELLOW}"
                local level="中"
                ;;
            2)
                local color="${RED}"
                local level="高"
                ;;
        esac
        
        # 绘制攻击强度条
        local bar_length=$((count / 20))
        if [ $bar_length -gt 30 ]; then
            bar_length=30
        fi
        local bar=$(printf '█%.0s' $(seq 1 $bar_length))
        
        echo -e "${GRAY}[$(date '+%H:%M:%S')]${RESET} ${country_name} ${ip}"
        echo -e "  ├─ 攻击类型: ${color}${attack}${RESET}"
        echo -e "  ├─ 攻击次数: ${WHITE}${count}${RESET} 次"
        echo -e "  ├─ 威胁等级: ${color}${level}危${RESET}"
        echo -e "  └─ 强度: ${color}${bar}${RESET} (${count})"
        sleep 0.25
    done
    
    echo ""
}

# 实时图表动画
realtime_chart() {
    echo -e "${BOLD}${MAGENTA}📈 ==================== 实时数据图表 ====================${RESET}"
    
    # 图表参数
    local chart_height=10
    local data_points=30
    
    # 网络流量趋势图（从左往右动画效果）
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    echo -e "${BOLD}网络流量趋势图（实时更新 - 从左往右）${RESET}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    
    # 存储数据点用于动画
    local -a data_values
    for ((i=0; i<$data_points; i++)); do
        data_values[$i]=$((RANDOM % $chart_height + 1))
    done
    
    # 从左往右逐步显示数据点
    for ((current_point=1; current_point<=$data_points; current_point++)); do
        # 更新当前数据点（模拟实时数据变化）
        if [ $current_point -lt $data_points ]; then
            local change=$((RANDOM % 3 - 1))  # -1, 0, 或 1
            data_values[$current_point]=$((RANDOM % $chart_height + 1))
        fi
        
        # 绘制Y轴和图表
        for ((y=$chart_height; y>=1; y--)); do
            local y_value=$((y * 10))
            printf "${GRAY}%3d │${RESET}" $y_value
            
            # 从左往右绘制数据点（只显示到当前点）
            for ((x=0; x<$current_point; x++)); do
                local value=${data_values[$x]}
                
                if [ $y -le $value ]; then
                    # 根据高度选择不同颜色和字符
                    if [ $y -gt $((chart_height * 8 / 10)) ]; then
                        echo -ne "${RED}█${RESET}"
                    elif [ $y -gt $((chart_height * 5 / 10)) ]; then
                        echo -ne "${YELLOW}█${RESET}"
                    else
                        echo -ne "${GREEN}█${RESET}"
                    fi
                else
                    echo -ne " "
                fi
            done
            
            # 如果还没到最后一个点，显示一个闪烁的光标
            if [ $current_point -lt $data_points ]; then
                echo -ne "${BLINK}█${RESET}"
            fi
            
            echo ""
        done
        
        # 绘制X轴
        echo -ne "${GRAY}    └"
        for ((x=0; x<$current_point; x++)); do
            echo -ne "─"
        done
        if [ $current_point -lt $data_points ]; then
            echo -ne "${BLINK}─${RESET}"
        fi
        echo -e "${RESET}"
        echo -e "${GRAY}    时间轴 → (${current_point}/${data_points})${RESET}"
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        
        sleep 0.15
        
        # 如果不是最后一个点，清除图表区域准备重绘
        if [ $current_point -lt $data_points ]; then
            for ((i=0; i<$((chart_height + 4)); i++)); do
                echo -ne "\033[A\033[K"
            done
        fi
    done
    
    echo ""
    
    # CPU使用率饼图（ASCII艺术）
    echo -e "${BOLD}CPU使用率分布${RESET}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    
    local cpu_user=$((RANDOM % 50 + 20))
    local cpu_system=$((RANDOM % 30 + 10))
    local cpu_idle=$((100 - cpu_user - cpu_system))
    
    # 绘制水平条形图
    echo -e "用户进程:   ${GREEN}$(printf '█%.0s' $(seq 1 $((cpu_user / 2))))${RESET} ${cpu_user}%"
    echo -e "系统进程:   ${YELLOW}$(printf '█%.0s' $(seq 1 $((cpu_system / 2))))${RESET} ${cpu_system}%"
    echo -e "空闲:       ${GRAY}$(printf '█%.0s' $(seq 1 $((cpu_idle / 2))))${RESET} ${cpu_idle}%"
    echo ""
    
    # 攻击类型统计柱状图
    echo -e "${BOLD}攻击类型统计${RESET}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    
    local attacks=("DDoS" "SQL注入" "XSS" "暴力破解" "端口扫描")
    local max_count=100
    
    for attack in "${attacks[@]}"; do
        local count=$((RANDOM % max_count + 10))
        local bar_length=$((count * 30 / max_count))
        local bar=$(printf '█%.0s' $(seq 1 $bar_length))
        
        printf "%-12s ${RED}%s${RESET} %3d\n" "$attack:" "$bar" "$count"
    done
    
    echo ""
    
    # 实时数据流（模拟实时更新）
    echo -e "${BOLD}实时数据流${RESET}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    
    for ((i=0; i<8; i++)); do
        local value=$((RANDOM % 100))
        local bar_length=$((value / 3))
        local bar=$(printf '█%.0s' $(seq 1 $bar_length))
        
        # 使用不同颜色表示不同范围
        if [ $value -gt 70 ]; then
            local bar_color="${RED}"
        elif [ $value -gt 40 ]; then
            local bar_color="${YELLOW}"
        else
            local bar_color="${GREEN}"
        fi
        
        echo -e "${GRAY}[$(date '+%H:%M:%S.%3N')]${RESET} ${bar_color}${bar}${RESET} ${value}%"
        sleep 0.2
    done
    
    echo ""
}

# 雷达扫描效果
radar_scan() {
    echo -e "${BOLD}${GREEN}🛰️  ==================== 雷达扫描系统 ====================${RESET}"
    
    # 绘制多个扫描帧
    for ((frame=0; frame<6; frame++)); do
        local angle=$((frame * 60))
        
        # 绘制雷达界面
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        echo -e "${BOLD}雷达扫描中... (角度: ${angle}°)${RESET}"
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        
        # 简化的雷达圆形显示
        echo -e "${GRAY}            ╭─────────────╮${RESET}"
        echo -e "${GRAY}          ╭─┤             ├─╮${RESET}"
        echo -e "${GRAY}        ╭─┤ │             │ ├─╮${RESET}"
        echo -e "${GRAY}      ╭─┤ │ │             │ │ ├─╮${RESET}"
        echo -e "${GRAY}    ╭─┤ │ │ │             │ │ │ ├─╮${RESET}"
        
        # 根据角度显示扫描线
        case $angle in
            0)
                echo -e "${GREEN}    │ │ │ │${RESET}${GRAY}─────────${RESET}${GREEN}│ │ │ │${RESET}"
                ;;
            60)
                echo -e "${GREEN}    │ │ │${RESET}${GRAY}───${RESET}${GREEN}│ │ │ │ │${RESET}"
                ;;
            120)
                echo -e "${GREEN}    │ │${RESET}${GRAY}───${RESET}${GREEN}│ │ │ │ │ │${RESET}"
                ;;
            180)
                echo -e "${GREEN}    │ │ │ │ │ │ │${RESET}${GRAY}─────────${RESET}"
                ;;
            240)
                echo -e "${GREEN}    │ │ │ │ │${RESET}${GRAY}───${RESET}${GREEN}│ │${RESET}"
                ;;
            300)
                echo -e "${GREEN}    │ │ │ │${RESET}${GRAY}───${RESET}${GREEN}│ │ │${RESET}"
                ;;
        esac
        
        echo -e "${GRAY}    ╰─┤ │ │ │             │ │ │ ├─╯${RESET}"
        echo -e "${GRAY}      ╰─┤ │ │             │ │ ├─╯${RESET}"
        echo -e "${GRAY}        ╰─┤ │             │ ├─╯${RESET}"
        echo -e "${GRAY}          ╰─┤             ├─╯${RESET}"
        echo -e "${GRAY}            ╰─────────────╯${RESET}"
        
        # 显示检测到的目标
        local targets=$((RANDOM % 4 + 1))
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        echo -e "${BOLD}检测到 ${RED}${targets}${RESET} 个可疑目标${RESET}"
        for ((t=0; t<$targets; t++)); do
            local target_angle=$((RANDOM % 360))
            local target_dist=$((RANDOM % 10 + 1))
            echo -e "  ${YELLOW}●${RESET} 目标 $((t+1)): 方位角 ${target_angle}° | 距离 ${target_dist}km | ${RED}威胁等级: 高${RESET}"
        done
        
        sleep 0.4
        
        # 清除雷达显示区域
        if [ $frame -lt 5 ]; then
            for ((i=0; i<18; i++)); do
                echo -ne "\033[A\033[K"
            done
        fi
    done
    
    echo ""
}

# 矩阵雨效果
matrix_rain() {
    echo -e "${BOLD}${GREEN}💚 ==================== 数据流矩阵 ====================${RESET}"
    
    local cols=50
    local rows=15
    local chars=("0" "1" "A" "B" "C" "D" "E" "F" "█" "▓" "▒" "░")
    
    # 生成多帧矩阵雨
    for ((frame=0; frame<10; frame++)); do
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        
        for ((r=0; r<$rows; r++)); do
            for ((c=0; c<$cols; c++)); do
                # 随机显示字符，形成雨滴效果
                if [ $((RANDOM % 3)) -eq 0 ]; then
                    local char_idx=$((RANDOM % ${#chars[@]}))
                    local char=${chars[$char_idx]}
                    
                    # 根据位置和帧数改变颜色
                    local color_idx=$(( (r + frame + c) % 3 ))
                    case $color_idx in
                        0) echo -ne "${GREEN}${char}${RESET}" ;;
                        1) echo -ne "${CYAN}${char}${RESET}" ;;
                        2) echo -ne "${WHITE}${char}${RESET}" ;;
                    esac
                else
                    echo -ne " "
                fi
            done
            echo ""
        done
        
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        echo -e "${GRAY}数据流分析中... 已处理 $((frame * 1000 + RANDOM % 1000)) 条数据包${RESET}"
        
        sleep 0.2
        
        # 清除显示区域
        if [ $frame -lt 9 ]; then
            for ((i=0; i<$((rows + 3)); i++)); do
                echo -ne "\033[A\033[K"
            done
        fi
    done
    
    echo ""
}

# 密码破解动画
password_crack() {
    echo -e "${BOLD}${RED}🔐 ==================== 密码破解检测 ====================${RESET}"
    
    local passwords=("admin123" "password" "123456" "root" "test" "admin" "qwerty")
    local target_ip=$(random_ip)
    local target_port=$((RANDOM % 1000 + 22))
    
    echo -e "${GRAY}目标: ${WHITE}${target_ip}:${target_port}${RESET}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    
    # 模拟暴力破解过程
    for ((attempt=0; attempt<8; attempt++)); do
        local pwd_idx=$((RANDOM % ${#passwords[@]}))
        local pwd=${passwords[$pwd_idx]}
        
        # 显示破解进度
        local progress=$((attempt * 12))
        local bar_length=$((progress / 2))
        local bar=$(printf '█%.0s' $(seq 1 $bar_length))
        
        echo -ne "${GRAY}[$(date '+%H:%M:%S')]${RESET} 尝试密码: ${YELLOW}${pwd}${RESET} "
        
        # 模拟破解延迟
        for ((d=0; d<3; d++)); do
            echo -ne "${BLINK}.${RESET}"
            sleep 0.1
        done
        
        if [ $attempt -eq 7 ]; then
            echo -e " ${RED}[成功破解]${RESET}"
            echo -e "${RED}⚠️  警告: 检测到密码暴力破解攻击！${RESET}"
            echo -e "${RED}   来源IP: ${target_ip} | 已尝试 ${WHITE}$((attempt+1))${RED} 次${RESET}"
        else
            echo -e " ${GREEN}[失败]${RESET}"
        fi
        
        echo -e "  进度: ${CYAN}[${bar}${GRAY}$(printf '░%.0s' $(seq 1 $((25-bar_length))) )${CYAN}]${RESET} ${progress}%"
        sleep 0.3
    done
    
    echo ""
}

# 数据流瀑布效果
data_waterfall() {
    echo -e "${BOLD}${BLUE}🌊 ==================== 数据流瀑布 ====================${RESET}"
    
    local width=50
    local height=10
    
    # 生成多帧瀑布效果
    for ((frame=0; frame<8; frame++)); do
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        
        # 生成随机数据流
        for ((h=0; h<$height; h++)); do
            for ((w=0; w<$width; w++)); do
                # 创建流动效果 - 使用正弦波模式
                local wave_pos=$(( (w + frame * 3 + h * 2) % 15 ))
                if [ $wave_pos -lt 8 ]; then
                    local intensity=$((8 - wave_pos))
                    local chars=("█" "▓" "▒" "░")
                    local char_idx=$((intensity / 2))
                    if [ $char_idx -ge ${#chars[@]} ]; then
                        char_idx=$((${#chars[@]} - 1))
                    fi
                    local char=${chars[$char_idx]}
                    
                    # 根据位置和帧数改变颜色
                    local color_idx=$(( (h + frame) % 3 ))
                    case $color_idx in
                        0) echo -ne "${CYAN}${char}${RESET}" ;;
                        1) echo -ne "${BLUE}${char}${RESET}" ;;
                        2) echo -ne "${WHITE}${char}${RESET}" ;;
                    esac
                else
                    echo -ne " "
                fi
            done
            echo ""
        done
        
        # 显示统计信息
        local speed=$((RANDOM % 1000 + 500))
        local total=$((frame * 10000 + RANDOM % 5000))
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        echo -e "${GRAY}传输速度: ${GREEN}${speed}${GRAY} KB/s | 总流量: ${WHITE}${total}${GRAY} MB${RESET}"
        
        sleep 0.2
        
        # 清除显示区域
        if [ $frame -lt 7 ]; then
            for ((i=0; i<$((height + 3)); i++)); do
                echo -ne "\033[A\033[K"
            done
        fi
    done
    
    echo ""
}

# 3D ASCII艺术 - 安全盾牌
ascii_shield() {
    echo -e "${BOLD}${CYAN}🛡️  ==================== 安全防护系统 ====================${RESET}"
    
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    
    # 3D盾牌ASCII艺术
    echo -e "${GREEN}"
    echo "        ╔═══════════════════════════════╗"
    echo "        ║     ████████████████████      ║"
    echo "        ║   ██                    ██    ║"
    echo "        ║ ██    ██          ██    ██   ║"
    echo "        ║██      ██        ██      ██  ║"
    echo "        ║██        ████████        ██  ║"
    echo "        ║██      ██        ██      ██  ║"
    echo "        ║ ██    ██          ██    ██   ║"
    echo "        ║   ██                    ██    ║"
    echo "        ║     ████████████████████      ║"
    echo "        ╚═══════════════════════════╝"
    echo -e "${RESET}"
    
    # 显示防护状态
    local threats_blocked=$((RANDOM % 1000 + 500))
    local systems_secured=$((RANDOM % 50 + 20))
    
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    echo -e "${GREEN}✓${RESET} 防护状态: ${GREEN}激活${RESET}"
    echo -e "${GREEN}✓${RESET} 已拦截威胁: ${WHITE}${threats_blocked}${RESET} 次"
    echo -e "${GREEN}✓${RESET} 受保护系统: ${WHITE}${systems_secured}${RESET} 个"
    echo -e "${GREEN}✓${RESET} 防护等级: ${YELLOW}最高${RESET}"
    
    # 闪烁效果
    for ((i=0; i<3; i++)); do
        sleep 0.3
        echo -ne "\033[5A"
        echo -e "${GREEN}✓${RESET} 防护状态: ${BLINK}${GREEN}激活${RESET}"
        echo -ne "\033[4B"
        sleep 0.3
        echo -ne "\033[5A"
        echo -e "${GREEN}✓${RESET} 防护状态: ${GREEN}激活${RESET}"
        echo -ne "\033[4B"
    done
    
    echo ""
}

# 文件传输动画（带速度显示）
file_transfer() {
    echo -e "${BOLD}${MAGENTA}📁 ==================== 文件传输监控 ====================${RESET}"
    
    local files=("security_log_2024.dat" "backup_archive.tar.gz" "system_config.xml" "database_dump.sql")
    local file=${files[$((RANDOM % ${#files[@]}))]}
    local total_size=$((RANDOM % 1000 + 100))
    local transferred=0
    
    echo -e "${GRAY}文件: ${WHITE}${file}${RESET}"
    echo -e "${GRAY}大小: ${WHITE}${total_size}${RESET} MB"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    
    # 模拟传输过程
    while [ $transferred -lt $total_size ]; do
        local speed=$((RANDOM % 50 + 10))
        transferred=$((transferred + speed))
        if [ $transferred -gt $total_size ]; then
            transferred=$total_size
        fi
        
        local percent=$((transferred * 100 / total_size))
        local bar_length=$((percent / 2))
        local bar=$(printf '█%.0s' $(seq 1 $bar_length))
        local empty=$(printf '░%.0s' $(seq 1 $((50-bar_length))))
        
        # 显示传输进度
        printf "${GRAY}[%s]${RESET} ${CYAN}[${GREEN}%s${GRAY}%s${CYAN}]${RESET} %3d%% | %3d/%3d MB | ${YELLOW}%3d${RESET} MB/s\r" \
            "$(date '+%H:%M:%S')" "$bar" "$empty" "$percent" "$transferred" "$total_size" "$speed"
        
        sleep 0.1
    done
    
    echo -e "\n${GREEN}✓${RESET} 传输完成！"
    echo ""
}

# 代码注入检测
code_injection_detect() {
    echo -e "${BOLD}${RED}💉 ==================== 代码注入检测 ====================${RESET}"
    
    local malicious_codes=(
        "<script>alert('XSS')</script>"
        "'; DROP TABLE users; --"
        "eval(base64_decode('...'))"
        "system('rm -rf /')"
        "<?php exec('wget ...') ?>"
    )
    
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    
    for ((i=0; i<6; i++)); do
        local code_idx=$((RANDOM % ${#malicious_codes[@]}))
        local code=${malicious_codes[$code_idx]}
        local ip=$(random_ip)
        
        echo -ne "${GRAY}[$(date '+%H:%M:%S')]${RESET} 检测到代码注入尝试来自 ${ip} ... "
        
        # 模拟检测过程
        sleep 0.2
        echo -ne "${YELLOW}分析中${RESET}"
        for ((d=0; d<3; d++)); do
            echo -ne "${BLINK}.${RESET}"
            sleep 0.1
        done
        
        echo -e " ${RED}[已拦截]${RESET}"
        echo -e "  └─ 恶意代码: ${RED}${code}${RESET}"
        echo -e "  └─ 操作: ${GREEN}已阻止并记录日志${RESET}"
        
        sleep 0.3
    done
    
    echo ""
}

# 主循环
main() {
    echo -e "${BOLD}${WHITE}"
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║          网络安全监控系统 v3.14.159                      ║"
    echo "║          Security Monitoring System                      ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo -e "${RESET}"
    sleep 1
    
    while true; do
        system_scan
        sleep 0.5
        
        network_monitor
        sleep 0.5
        
        intrusion_detection
        sleep 0.5
        
        firewall_update
        sleep 0.5
        
        virus_db_update
        sleep 0.5
        
        crypto_handshake
        sleep 0.5
        
        resource_monitor
        sleep 0.5
        
        log_analysis
        sleep 0.5
        
        world_map_attacks
        sleep 0.5
        
        realtime_chart
        sleep 0.5
        
        radar_scan
        sleep 0.5
        
        matrix_rain
        sleep 0.5
        
        password_crack
        sleep 0.5
        
        data_waterfall
        sleep 0.5
        
        ascii_shield
        sleep 0.5
        
        file_transfer
        sleep 0.5
        
        code_injection_detect
        sleep 1
        
        echo -e "${BOLD}${GREEN}==================== 扫描周期完成 ====================${RESET}"
        echo -e "${CYAN}等待下一轮扫描...${RESET}\n"
        sleep 2
    done
}

# 运行主程序
main