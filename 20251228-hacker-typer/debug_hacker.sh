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
HOST="${GREEN}scientist@gaia-institute${RESET}:${BLUE}~/research-data${RESET}$ "

# 定义几个不同的输出块
BLOCKS=(
# 短消息：系统状态正常
"
${GREEN}[OK] SYSTEM STATUS CHECK${RESET}
${GREEN}[OK] CPU Load: 12% (Optimal)${RESET}
${GREEN}[OK] Memory Usage: 3.4GB / 32GB${RESET}
${BLUE}[INFO] All research modules are active and running efficiently.${RESET}
"

# 短消息：网络连接
"
${BLUE}[*] Connecting to Global Science Network...${RESET}
${YELLOW}[...] Verifying credentials with Open Access Repository${RESET}
${GREEN}[+] Connection secured (TLS 1.3).${RESET}
${GRAY}Latency: 24ms | Bandwidth: 10Gbps${RESET}
"

# 中等：环境监测卫星数据
"
${BLUE}[*] Receiving telemetry from GAIA-SAT-1${RESET}
${GRAY}Orbit: Low Earth Orbit (LEO) | Inclination: 98.2°${RESET}
${WHITE}Processing sensor data stream...${RESET}
[Sector A1] Atmospheric CO2: ${GREEN}415 ppm (Stable)${RESET}
[Sector A1] Ozone Layer Thickness: ${GREEN}298 DU (Recovering)${RESET}
[Sector B3] Amazon Rainforest Cover: ${YELLOW}Analyzing spectral signature...${RESET}
${GREEN}[+] Deforestation alert level: LOW${RESET}
${GREEN}[+] Reforestation initiatives detected in Sector B3-North.${RESET}
${CYAN}Data packet saved to /data/climate/2025-12-29.dat${RESET}
"

# 中等：DNA序列分析
"
${MAGENTA}[*] DNA Sequencing in progress...${RESET}
${GRAY}Sample ID: H-2025-Alpha (Rare Orchid Species)${RESET}
GCATGCATGCATGCATGCATGCATGCATGCATGCATGCAT
${GREEN}Matching genetic markers...${RESET}
Marker 1 (Growth Rate): ${GREEN}POSITIVE${RESET}
Marker 2 (Drought Resistance): ${GREEN}POSITIVE${RESET}
Marker 3 (Pest Resistance): ${GREEN}POSITIVE${RESET}
${WHITE}Analysis complete.${RESET}
${BLUE}[INFO] This species shows high potential for arid environment restoration.${RESET}
${GREEN}[+] Sequence uploaded to Global Biodiversity Database.${RESET}
"

# 中等：太阳能电站效率优化
"
${YELLOW}[*] Solar Farm Grid Optimization${RESET}
${GRAY}Location: Sahara Desert Station 4${RESET}
Panel 001: Efficiency 98% - ${GREEN}OPTIMAL${RESET}
Panel 002: Efficiency 97% - ${GREEN}OPTIMAL${RESET}
Panel 003: Efficiency 92% - ${YELLOW}Cleaning required${RESET}
Panel 004: Efficiency 98% - ${GREEN}OPTIMAL${RESET}
...
${BLUE}[*] Adjusting tilt angles for afternoon sun position...${RESET}
Tilt changed to 42.5°
${GREEN}[+] Total power output increased by 2.3%${RESET}
${GREEN}[+] Battery storage at 95% capacity.${RESET}
"

# 长：医学药物模拟
"
${CYAN}[*] Running Molecular Dynamics Simulation${RESET}
${GRAY}Target Protein: Alzheimer's Beta-Amyloid${RESET}
${GRAY}Candidate Drug: C22H30N6O4 (Compound-X)${RESET}
Step 1: Docking simulation...
[0%] ....................
[25%] ....................
[50%] ....................
[75%] ....................
[100%] .................... ${GREEN}COMPLETE${RESET}
${WHITE}Binding Affinity: -12.4 kcal/mol${RESET}
${GREEN}[+] Strong binding detected!${RESET}
${WHITE}Checking for side effects...${RESET}
Liver Toxicity: ${GREEN}LOW${RESET}
Heart Interaction: ${GREEN}NONE${RESET}
${BLUE}[INFO] Compound-X is a promising candidate for clinical trials.${RESET}
"

# 长：火星探测车遥测
"
${RED}[*] Mars Rover 'Curiosity-2' Status Update${RESET}
${GRAY}Sol: 452 | Battery: 88% | Temp: -45°C${RESET}
${WHITE}Executing geological survey command sequence...${RESET}
[CMD] Move Forward 10m... ${GREEN}DONE${RESET}
[CMD] Activate Drill... ${GREEN}DONE${RESET}
[CMD] Collect Sample... ${GREEN}DONE${RESET}
[CMD] Analyze Mineral Composition...
Spectrometer Results:
- Silicon Dioxide: 45%
- Iron Oxide: 18%
- Aluminum Oxide: 10%
- ${MAGENTA}Water Ice Traces: DETECTED${RESET}
${GREEN}[!] SIGNIFICANT DISCOVERY: Subsurface water ice confirmed in Sector 7G.${RESET}
${BLUE}[*] Transmitting high-res images to Earth...${RESET}
"

# 巨长：气候模型模拟
"
${BLUE}[*] Initializing Global Climate Model (GCM) v5.0${RESET}
${GRAY}Scenario: RCP 2.6 (High Mitigation)${RESET}
${WHITE}Loading oceanic currents data...${RESET} ${GREEN}OK${RESET}
${WHITE}Loading atmospheric circulation data...${RESET} ${GREEN}OK${RESET}
${WHITE}Loading cryosphere data...${RESET} ${GREEN}OK${RESET}
Year 2030: Temp Anomaly +1.2°C | Sea Level +5cm
Year 2040: Temp Anomaly +1.3°C | Sea Level +12cm
Year 2050: Temp Anomaly +1.4°C | Sea Level +18cm
Year 2060: Temp Anomaly +1.4°C | Sea Level +22cm
${GREEN}[+] Peak temperature stabilized.${RESET}
${GREEN}[+] Renewable energy transition effective.${RESET}
${GREEN}[+] Arctic ice volume stabilizing.${RESET}
${BLUE}[INFO] Simulation confirms that immediate action can limit warming to 1.5°C.${RESET}
"

# 巨长：教育资源分发
"
${MAGENTA}[*] Digital Library Synchronization${RESET}
${GRAY}Target Region: Rural Schools Network (Global)${RESET}
${WHITE}Syncing textbooks and interactive lessons...${RESET}
Uploading 'Physics_Basics_v3.pdf'... ${GREEN}100%${RESET}
Uploading 'World_History_Interactive.iso'... ${GREEN}100%${RESET}
Uploading 'Mathematics_for_Everyone.epub'... ${GREEN}100%${RESET}
Uploading 'Coding_101_Python.mp4'... ${GREEN}100%${RESET}
Uploading 'Biology_Virtual_Lab.exe'... ${GREEN}100%${RESET}
...
${GREEN}[+] 1,500 schools updated.${RESET}
${GREEN}[+] 500,000 students now have access to latest educational materials.${RESET}
${BLUE}[INFO] Knowledge bridge established successfully.${RESET}
"

# 巨长：海洋清理无人机群
"
${CYAN}[*] Ocean Cleanup Drone Swarm Control${RESET}
${GRAY}Deployment Zone: Great Pacific Garbage Patch${RESET}
${WHITE}Drone 01 Status:${RESET} Collecting plastic waste... ${GREEN}[Capacity: 85%]${RESET}
${WHITE}Drone 02 Status:${RESET} Collecting plastic waste... ${GREEN}[Capacity: 90%]${RESET}
${WHITE}Drone 03 Status:${RESET} Returning to mothership for unloading...
${WHITE}Drone 04 Status:${RESET} Scanning for marine life to avoid...
${YELLOW}[!] Turtle detected near Drone 05 path.${RESET}
${GREEN}[+] Drone 05 course corrected. Wildlife safe.${RESET}
${WHITE}Total Waste Collected Today: 45.2 Tons${RESET}
${WHITE}Recycling Potential: 98%${RESET}
${BLUE}[INFO] The ocean is getting cleaner, one day at a time.${RESET}
"

# 巨长：智慧城市交通优化
"
${YELLOW}[*] Smart City Traffic Management System${RESET}
${GRAY}City: Metropolis | Time: 08:30 AM (Rush Hour)${RESET}
${WHITE}Analyzing traffic flow sensors...${RESET}
Zone A (Downtown): Congestion detected.
Zone B (Bridge): Flowing freely.
Zone C (School District): Heavy traffic.
${BLUE}[*] Optimizing traffic light timing...${RESET}
- Increasing green light duration on Main St. by 15s.
- Diverting autonomous vehicles to Ring Road.
- Prioritizing public transport buses at intersections.
${GREEN}[+] Congestion reduced by 24%.${RESET}
${GREEN}[+] Average commute time reduced by 10 minutes.${RESET}
${GREEN}[+] CO2 emissions reduced by 15% due to less idling.${RESET}
"

# 巨长：粒子物理实验数据 (CERN)
"
${MAGENTA}[*] Large Hadron Collider (LHC) Experiment Run${RESET}
${GRAY}Detector: ATLAS | Energy: 13.6 TeV${RESET}
${WHITE}Collision Event #992837482${RESET}
Tracking particles...
- Muon detected (pT = 45 GeV)
- Electron detected (pT = 32 GeV)
- Jet detected (pT = 120 GeV)
${YELLOW}Analyzing invariant mass...${RESET}
Calculating Higgs boson probability...
...
...
${GREEN}[!] RESONANCE FOUND AT 125 GeV${RESET}
${GREEN}[+] Higgs boson candidate confirmed with 5-sigma certainty.${RESET}
${BLUE}[INFO] Standard Model validation continues.${RESET}
"

# 巨长：分布式计算 (Folding@Home)
"
${CYAN}[*] Distributed Computing Node${RESET}
${GRAY}Project: Cancer Research | Work Unit: 18492${RESET}
${WHITE}Downloading protein structure...${RESET} ${GREEN}DONE${RESET}
${WHITE}Simulating folding pathway...${RESET}
Frame 1: Energy -500 kJ/mol
Frame 2: Energy -520 kJ/mol
Frame 3: Energy -510 kJ/mol (Local minimum escaped)
Frame 4: Energy -550 kJ/mol
...
Frame 1000: Energy -800 kJ/mol (Native state reached)
${GREEN}[+] Work Unit completed successfully.${RESET}
${GREEN}[+] Results uploaded to central server.${RESET}
${BLUE}[INFO] Contribution added to finding a cure.${RESET}
"

# 新增 1: 精准农业无人机网络
"
${GREEN}[*] Agri-Tech Drone Swarm 'Harvest-Moon'${RESET}
${GRAY}Region: Central Valley | Crop: Organic Wheat${RESET}
${WHITE}Scanning Field Sector 7...${RESET}
Soil Moisture: 45% (Low)
Nitrogen Levels: 22% (Sub-optimal)
Pest Detection: ${GREEN}NONE${RESET}
${BLUE}[*] Activating Precision Irrigation Systems...${RESET}
Sprinkler 4A: ON [Target: +10% Moisture]
Sprinkler 4B: ON [Target: +12% Moisture]
${YELLOW}[*] Deploying Bio-Fertilizer Drone Unit...${RESET}
Payload released at coordinates 34.2N, 118.4W.
${GREEN}[+] Crop health projection updated: +15% Yield.${RESET}
${GREEN}[+] Water usage optimized. 300 Gallons saved.${RESET}
"

# 新增 2: 野生动物迁徙追踪
"
${BLUE}[*] Global Wildlife Tracking System${RESET}
${GRAY}Target: Blue Whale Pod #42 (The Singers)${RESET}
${WHITE}Satellite Lock: ACQUIRED${RESET}
Current Location: South Pacific (45.3S, 150.2W)
Depth: 200m
Heart Rate: 8 bpm (Resting)
${MAGENTA}Audio Analysis in progress...${RESET}
- Frequency: 15Hz - 20Hz
- Pattern: 'Migration Song Type B'
${GREEN}[+] New calf signature detected in the pod!${RESET}
${GREEN}[+] Pod is safely navigating away from shipping lanes.${RESET}
${BLUE}[INFO] Marine Protection Area enforced.${RESET}
"

# 新增 3: 地震预警网络
"
${RED}[!] SEISMIC ALERT NETWORK TRIGGERED${RESET}
${GRAY}Sensor Array: Pacific Rim | Event ID: EQ-2025-998${RESET}
${WHITE}Triangulating Epicenter...${RESET}
P-Wave detected at Station 04.
S-Wave detected at Station 08 (Lag: 4.2s).
Epicenter: 40km offshore. Depth: 15km.
${YELLOW}Calculating Magnitude...${RESET}
Estimated Magnitude: 4.2 (Minor)
${GREEN}[+] Tsunami Threat: NONE${RESET}
${GREEN}[+] Critical Infrastructure: SECURE${RESET}
${BLUE}[INFO] Data logged for geological study.${RESET}
"

# 新增 4: 聚变反应堆状态
"
${CYAN}[*] ITER Fusion Reactor Control${RESET}
${GRAY}Experiment: Long-Pulse Plasma Discharge${RESET}
${WHITE}Magnetic Confinement System: ACTIVE${RESET}
Toroidal Field: 11.8 Tesla
Poloidal Field: 6.2 Tesla
${YELLOW}Injecting Deuterium-Tritium Fuel Pellet...${RESET}
Heating Plasma...
Core Temperature: 80 Million K
Core Temperature: 100 Million K ${GREEN}[IGNITION THRESHOLD]${RESET}
${GREEN}[+] Plasma State: STABLE${RESET}
${GREEN}[+] Net Energy Gain (Q) > 1.05${RESET}
${BLUE}[INFO] Clean, limitless energy generation simulation successful.${RESET}
"

# 新增 5: 卫星互联网连接
"
${MAGENTA}[*] Star-Link Constellation Gateway${RESET}
${GRAY}Target: Remote Village School (Andes Mountains)${RESET}
${WHITE}Establishing Downlink...${RESET}
Satellite: V2-458 (Overhead)
Signal Strength: 98% (-45dBm)
Handshake: ACK
${BLUE}[*] Routing Traffic...${RESET}
Bandwidth Allocated: 500 Mbps
Latency: 28ms
${GREEN}[+] Internet Access Restored.${RESET}
${GREEN}[+] Telemedicine Portal: ONLINE${RESET}
${GREEN}[+] Digital Classroom: ONLINE${RESET}
"

# 新增 6: 道德网络防御
"
${RED}[*] Cyber Defense Grid - White Hat Protocol${RESET}
${GRAY}Monitoring Critical Hospital Infrastructure${RESET}
${YELLOW}[!] Intrusion Attempt Detected on Port 443${RESET}
Signature: Ransomware.Variant.X
Source: Botnet (Distributed)
${BLUE}[*] Activating Counter-Measures...${RESET}
- Isolating affected subnet.
- Deploying Decryption Keys.
- Tracing Command & Control Server.
${GREEN}[+] Attack Neutralized.${RESET}
${GREEN}[+] Patient Data Integrity: 100%${RESET}
${GREEN}[+] Vulnerability Patched (CVE-2025-8842).${RESET}
${BLUE}[INFO] Hospital operations continuing normally.${RESET}
"

# 新增 7: 智能电网负载平衡
"
${YELLOW}[*] Continental Smart Grid Controller${RESET}
${GRAY}Region: Northern Hemisphere | Season: Winter${RESET}
${WHITE}Monitoring Power Demand...${RESET}
Current Load: 450 GW (Peak)
Renewable Supply: 380 GW
Gap: 70 GW
${BLUE}[*] Balancing Load...${RESET}
- Importing excess Wind Power from North Sea Grid.
- Activating Hydro-Storage Release.
- Discharging Community Battery Banks (20% depth).
${GREEN}[+] Grid Frequency Stabilized at 50.00 Hz.${RESET}
${GREEN}[+] Blackout Prevented.${RESET}
${GREEN}[+] Fossil Fuel Peaker Plants: OFFLINE (Not needed)${RESET}
"

# 新增 8: 生物3D打印实验室
"
${CYAN}[*] Bio-Fabrication Laboratory${RESET}
${GRAY}Printer: Organ-X 5000 | Task: Cardiac Tissue Patch${RESET}
${WHITE}Preparing Bio-Ink...${RESET}
Stem Cells: Induced Pluripotent (iPS)
Scaffold: Alginate-Collagen Mix
${YELLOW}Printing Layer 1 of 200...${RESET}
Printing Layer 45...
Printing Layer 90...
Printing Layer 180...
${GREEN}[+] Printing Complete.${RESET}
${GREEN}[+] Cell Viability: 99.8%${RESET}
${GREEN}[+] Vascularization: Successful${RESET}
${BLUE}[INFO] Tissue ready for transplant testing.${RESET}
"

# 新增 9: 系外行星搜寻
"
${BLUE}[*] Deep Space Telescope Data Analysis${RESET}
${GRAY}Target Star: KIC-8462852 (Tabby's Star)${RESET}
${WHITE}Analyzing Light Curve...${RESET}
Transit Event Detected: T-0
Brightness Dip: 0.8%
Duration: 4.5 Hours
Periodicity: Confirmed
${MAGENTA}Calculating Planetary Parameters...${RESET}
Radius: 1.2 x Earth
Orbit: Habitable Zone (Goldilocks)
Atmosphere Spectrography: Nitrogen, Oxygen, Water Vapor detected.
${GREEN}[!] POTENTIAL EARTH-ANALOGUE CONFIRMED${RESET}
${BLUE}[INFO] Adding to 'Candidates for Life' catalog.${RESET}
"

# 新增 10: 濒危语言AI翻译保存
"
${MAGENTA}[*] Cultural Heritage Preservation AI${RESET}
${GRAY}Input Source: Audio Archive Tape #1984${RESET}
${GRAY}Language: Ainu (Critically Endangered)${RESET}
${WHITE}Processing Waveform...${RESET}
Noise Reduction: Active
Speaker Separation: Active
${BLUE}[*] Translating to Universal Knowledge Graph...${RESET}
Detected Phrase: 'Kamuy' -> Concept: 'Spirit/God in Nature'
Detected Phrase: 'Yukara' -> Concept: 'Epic Saga'
${GREEN}[+] 45 New Words Archived.${RESET}
${GREEN}[+] Grammar Structure Mapped.${RESET}
${GREEN}[+] Cultural Context Preserved.${RESET}
${BLUE}[INFO] This language will never be lost.${RESET}
"
)

# 欢迎信息
echo -e "${BOLD}Scientific Research Terminal v2.0${RESET}"
echo -e "Type any command and press ENTER to simulate research operations."
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
