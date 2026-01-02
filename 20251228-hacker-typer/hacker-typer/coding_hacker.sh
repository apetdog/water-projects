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

# 隐藏触发逻辑
INPUT_HISTORY=""
TRIGGER_KEYWORD="link"

check_input() {
    local char="$1"
    # Append char to history
    INPUT_HISTORY="${INPUT_HISTORY}${char}"
    # Keep last 20 chars
    if [[ ${#INPUT_HISTORY} -gt 20 ]]; then
        INPUT_HISTORY="${INPUT_HISTORY: -20}"
    fi
    
    # Check for trigger
    if [[ "$INPUT_HISTORY" == *"$TRIGGER_KEYWORD"* ]]; then
        echo -e "\n\n"
        echo -e "${RED}╔══════════════════════════════════════════════════════╗${RESET}"
        echo -e "${RED}║                                                      ║${RESET}"
        echo -e "${RED}║   ${GREEN}点击访问管理系统                                  ${RED} ║${RESET}"
        echo -e "${RED}║   ${BLUE}>> https://cn.moodl.ink/water-admin <<            ${RED} ║${RESET}"
        echo -e "${RED}║                                                      ║${RESET}"
        echo -e "${RED}╚══════════════════════════════════════════════════════╝${RESET}"
        echo -e "\n"
        exit 0
    fi
}

# 原始代码内容 (Python Data Analytics)
RAW_CODE=$(cat << 'EOF_CODE'
"""
COMPREHENSIVE POPULATION DATA ANALYTICS AND VISUALIZATION SYSTEM
Version: 2.0.0
Author: Data Science Team
Description: Advanced population analytics with predictive modeling and interactive visualizations
"""

# ============================================================================
# MODULE IMPORTS AND CONFIGURATION
# ============================================================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib import font_manager
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import warnings
warnings.filterwarnings('ignore')

# Advanced scientific computing
from scipy import stats
from scipy.optimize import curve_fit
from scipy.stats import linregress, pearsonr, spearmanr
from scipy.interpolate import interp1d
import statsmodels.api as sm
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

# Machine learning and forecasting
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.neural_network import MLPRegressor

# Geographical visualization
import geopandas as gpd
import contextily as ctx
from mpl_toolkits.axes_grid1 import make_axes_locatable
import folium
from folium.plugins import HeatMap

# Database and I/O operations
import sqlite3
import json
import pickle
import h5py
from datetime import datetime, timedelta
import calendar
import itertools
from collections import defaultdict, Counter
import os
import sys
import inspect
from pathlib import Path
import logging
import argparse
import configparser
from typing import List, Dict, Tuple, Optional, Union, Any, Callable
from dataclasses import dataclass, field
from enum import Enum, auto

# Visualization extensions
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend for server use
from matplotlib import cm
from matplotlib.colors import LinearSegmentedColormap, to_hex
from matplotlib.patches import Patch, Rectangle, Circle, Wedge
from matplotlib.lines import Line2D
from matplotlib.ticker import FuncFormatter, MultipleLocator, AutoMinorLocator
import matplotlib.dates as mdates
from matplotlib import ticker

# Advanced statistical visualization
import joypy
import squarify
from windrose import WindroseAxes
import networkx as nx

# Set global configurations
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")
plt.rcParams['font.size'] = 10
plt.rcParams['axes.titlesize'] = 14
plt.rcParams['axes.labelsize'] = 12
plt.rcParams['xtick.labelsize'] = 10
plt.rcParams['ytick.labelsize'] = 10
plt.rcParams['legend.fontsize'] = 10
plt.rcParams['figure.titlesize'] = 16

# Create output directories
for directory in ['output_charts', 'output_data', 'logs', 'models', 'reports']:
    os.makedirs(directory, exist_ok=True)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/population_analysis.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# ============================================================================
# DATA STRUCTURES AND ENUMS
# ============================================================================

class ChartType(Enum):
    """Enumeration of available chart types"""
    LINE = auto()
    BAR = auto()
    SCATTER = auto()
    HISTOGRAM = auto()
    BOXPLOT = auto()
    VIOLIN = auto()
    HEATMAP = auto()
    CONTOUR = auto()
    SURFACE = auto()
    PIE = auto()
    DONUT = auto()
    AREA = auto()
    STACKED_AREA = auto()
    STACKED_BAR = auto()
    WATERFALL = auto()
    FUNNEL = auto()
    SUNBURST = auto()
    TREEMAP = auto()
    PARALLEL_CATEGORIES = auto()
    PARALLEL_COORDINATES = auto()
    RADAR = auto()
    POLAR = auto()
    BUBBLE = auto()
    HEXBIN = auto()
    DENSITY = auto()
    RIDGELINE = auto()
    SANKEY = auto()
    NETWORK = auto()
    MAP = auto()
    TIMESERIES = auto()
    CORRELATION_MATRIX = auto()
    PAIRPLOT = auto()
    JOINTPLOT = auto()
    FACETGRID = auto()
    DASHBOARD = auto()


class DataSource(Enum):
    """Enumeration of data sources"""
    SYNTHETIC = auto()
    CSV = auto()
    EXCEL = auto()
    SQL = auto()
    API = auto()
    WEB_SCRAPING = auto()


class AnalysisType(Enum):
    """Enumeration of analysis types"""
    DESCRIPTIVE = auto()
    PREDICTIVE = auto()
    PRESCRIPTIVE = auto()
    DIAGNOSTIC = auto()
    EXPLORATORY = auto()
    INFERENTIAL = auto()


@dataclass
class PopulationMetrics:
    """Comprehensive population metrics container"""
    total_population: float
    male_population: float
    female_population: float
    birth_rate: float
    death_rate: float
    growth_rate: float
    fertility_rate: float
    life_expectancy: float
    median_age: float
    dependency_ratio: float
    urbanization_rate: float
    population_density: float
    migration_rate: float
    sex_ratio: float
    age_dependency_young: float
    age_dependency_old: float
    infant_mortality: float
    maternal_mortality: float
    gdp_per_capita: float
    literacy_rate: float
    unemployment_rate: float
    poverty_rate: float
    healthcare_index: float
    education_index: float
    
    def to_dict(self) -> Dict[str, float]:
        """Convert metrics to dictionary"""
        return {k: v for k, v in self.__dict__.items()}


@dataclass
class DemographicSegment:
    """Demographic segment definition"""
    age_group: str
    male_count: int
    female_count: int
    total_count: int
    growth_rate: float
    mortality_rate: float
    fertility_rate: float
    labor_force_participation: float
    education_level: float
    income_level: float
    
    def calculate_sex_ratio(self) -> float:
        """Calculate sex ratio for this segment"""
        return (self.male_count / self.female_count) * 100 if self.female_count > 0 else 0


@dataclass
class GeographicRegion:
    """Geographic region container"""
    region_id: str
    region_name: str
    country: str
    latitude: float
    longitude: float
    area_km2: float
    population: int
    density: float
    urban_population: int
    rural_population: int
    gdp_total: float
    gdp_per_capita: float
    development_index: float
    climate_zone: str
    terrain_type: str
    
    def calculate_population_density(self) -> float:
        """Calculate population density"""
        return self.population / self.area_km2 if self.area_km2 > 0 else 0


class PopulationProjectionModel:
    """Base class for population projection models"""
    
    def __init__(self, model_name: str, model_type: str):
        self.model_name = model_name
        self.model_type = model_type
        self.parameters = {}
        self.trained = False
        self.accuracy_metrics = {}
        self.predictions = None
        
    def train(self, X: np.ndarray, y: np.ndarray):
        """Train the model"""
        pass
    
    def predict(self, X: np.ndarray) -> np.ndarray:
        """Make predictions"""
        pass
    
    def evaluate(self, X_test: np.ndarray, y_test: np.ndarray) -> Dict[str, float]:
        """Evaluate model performance"""
        pass


# ============================================================================
# DATA GENERATION AND SIMULATION MODULE
# ============================================================================

class PopulationDataGenerator:
    """Advanced population data generation and simulation"""
    
    def __init__(self, seed: int = 42):
        """Initialize generator with random seed"""
        np.random.seed(seed)
        self.countries = [
            'United States', 'China', 'India', 'Japan', 'Germany', 
            'United Kingdom', 'France', 'Brazil', 'Italy', 'Canada',
            'Russia', 'South Korea', 'Australia', 'Spain', 'Mexico',
            'Indonesia', 'Netherlands', 'Saudi Arabia', 'Turkey', 'Switzerland'
        ]
        self.regions = {
            'North America': ['United States', 'Canada', 'Mexico'],
            'Europe': ['Germany', 'United Kingdom', 'France', 'Italy', 'Spain', 'Netherlands', 'Switzerland'],
            'Asia': ['China', 'India', 'Japan', 'Russia', 'South Korea', 'Indonesia', 'Saudi Arabia', 'Turkey'],
            'Oceania': ['Australia'],
            'South America': ['Brazil']
        }
        self.age_groups = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', 
                          '30-34', '35-39', '40-44', '45-49', '50-54', 
                          '55-59', '60-64', '65-69', '70-74', '75-79', '80+']
        
    def generate_world_population_dataset(self, start_year: int = 1950, end_year: int = 2100) -> pd.DataFrame:
        """Generate comprehensive world population dataset"""
        logger.info(f"Generating world population dataset from {start_year} to {end_year}")
        
        years = range(start_year, end_year + 1)
        countries = self.countries
        
        data = []
        for year in years:
            for country in countries:
                # Base population with realistic growth patterns
                base_pop = {
                    'USA': 150, 'China': 550, 'India': 350, 'Japan': 80, 'Germany': 70,
                    'UK': 50, 'France': 40, 'Brazil': 50, 'Italy': 45, 'Canada': 15,
                    'Russia': 100, 'South Korea': 25, 'Australia': 10, 'Spain': 30, 'Mexico': 25,
                    'Indonesia': 70, 'Netherlands': 10, 'Saudi Arabia': 5, 'Turkey': 25, 'Switzerland': 5
                }
                
                base = base_pop.get(country, 50) * 1e6  # Convert to actual numbers
                
                # Apply country-specific growth trends
                growth_factors = {
                    'China': 0.015, 'India': 0.018, 'United States': 0.008,
                    'Japan': 0.001, 'Germany': 0.002, 'United Kingdom': 0.005,
                    'Brazil': 0.012, 'Russia': 0.003, 'Australia': 0.013
                }
                
                growth_rate = growth_factors.get(country, 0.01)
                
                # Adjust growth rate over time (demographic transition)
                if year > 2000:
                    growth_rate *= 0.9  # Slower growth in 21st century
                if year > 2050:
                    growth_rate *= 0.7  # Even slower in late 21st century
                
                # Calculate population with random variations
                years_from_start = year - start_year
                population = base * (1 + growth_rate) ** years_from_start
                population *= np.random.uniform(0.98, 1.02)  # Add some randomness
                
                # Generate demographic metrics
                birth_rate = np.random.normal(12, 4)  # Mean 12‰, std 4
                death_rate = np.random.normal(8, 2)   # Mean 8‰, std 2
                growth_rate_actual = birth_rate - death_rate
                
                # Age structure (pyramid shape)
                median_age = np.random.normal(30, 10)
                if country in ['Japan', 'Germany', 'Italy']:
                    median_age = np.random.normal(45, 5)  # Older populations
                
                # Economic indicators
                gdp_per_capita = np.random.lognormal(9, 1)  # Log-normal distribution
                
                # Urbanization (increasing over time)
                urbanization_base = 0.3 if year <= 1970 else 0.5 if year <= 2000 else 0.7
                urbanization_rate = urbanization_base + (year - start_year) * 0.005
                urbanization_rate = min(urbanization_rate, 0.95)
                
                # Life expectancy (improving over time)
                life_expectancy = 50 + (year - 1950) * 0.3 + np.random.normal(0, 3)
                
                # Fertility rate (declining over time)
                fertility_rate = 5.0 - (year - 1950) * 0.03 + np.random.normal(0, 0.5)
                fertility_rate = max(fertility_rate, 1.2)
                
                # Dependency ratios
                dependency_ratio = 0.5 + np.random.normal(0, 0.1)
                
                row = {
                    'year': year,
                    'country': country,
                    'region': self._get_region(country),
                    'population': int(population),
                    'population_density': np.random.lognormal(5, 1),
                    'birth_rate': birth_rate,
                    'death_rate': death_rate,
                    'growth_rate': growth_rate_actual,
                    'fertility_rate': fertility_rate,
                    'life_expectancy': life_expectancy,
                    'median_age': median_age,
                    'dependency_ratio': dependency_ratio,
                    'urbanization_rate': urbanization_rate,
                    'gdp_per_capita': gdp_per_capita,
                    'literacy_rate': 0.7 + (year - 1950) * 0.003 + np.random.normal(0, 0.05),
                    'unemployment_rate': np.random.beta(2, 8) * 15,  # Beta distribution
                    'poverty_rate': np.random.beta(3, 10) * 30,
                    'healthcare_index': np.random.uniform(0.3, 0.95),
                    'education_index': np.random.uniform(0.4, 0.98),
                    'sex_ratio': np.random.normal(101, 3),  # Males per 100 females
                    'migration_rate': np.random.normal(0, 2),
                    'co2_emissions': np.random.lognormal(6, 1),  # Per capita
                    'energy_consumption': np.random.lognormal(7, 0.8),
                    'water_stress': np.random.beta(2, 5),
                    'food_security': np.random.uniform(0.5, 1.0),
                    'political_stability': np.random.uniform(-2.5, 2.5),
                    'corruption_index': np.random.uniform(0, 100),
                    'happiness_index': np.random.uniform(4, 8),
                    'digital_adoption': np.random.uniform(0.1, 0.9) * (year - 1950) / 100
                }
                data.append(row)
        
        df = pd.DataFrame(data)
        
        # Add calculated fields
        df['natural_increase'] = df['birth_rate'] - df['death_rate']
        df['doubling_time'] = 70 / df['growth_rate'].clip(lower=0.1)
        df['population_change'] = df.groupby('country')['population'].pct_change()
        df['gdp_total'] = df['population'] * df['gdp_per_capita']
        
        logger.info(f"Generated dataset with {len(df)} records")
        return df
    
    def generate_age_structure_data(self, country: str, year: int) -> pd.DataFrame:
        """Generate detailed age structure/population pyramid data"""
        logger.info(f"Generating age structure for {country} in {year}")
        
        age_data = []
        
        # Country-specific age distributions
        age_distributions = {
            'developing': [0.08, 0.07, 0.06, 0.06, 0.05, 0.05, 0.05, 0.05, 0.04, 
                          0.04, 0.04, 0.04, 0.04, 0.04, 0.03, 0.02, 0.01],
            'developed': [0.05, 0.05, 0.05, 0.05, 0.06, 0.06, 0.06, 0.06, 0.06,
                         0.06, 0.06, 0.06, 0.05, 0.05, 0.04, 0.03, 0.02],
            'aging': [0.03, 0.03, 0.03, 0.04, 0.04, 0.04, 0.05, 0.05, 0.06,
                     0.06, 0.07, 0.07, 0.07, 0.06, 0.05, 0.04, 0.03]
        }
        
        # Determine distribution type
        if country in ['Japan', 'Germany', 'Italy']:
            dist_type = 'aging'
        elif country in ['United States', 'United Kingdom', 'Canada', 'Australia']:
            dist_type = 'developed'
        else:
            dist_type = 'developing'
        
        distribution = age_distributions[dist_type]
        
        # Apply time trend (aging population over time)
        age_shift = (year - 1950) / 100  # Shift distribution to right over time
        distribution = np.roll(distribution, int(age_shift * 3))
        
        # Generate data for each age group
        total_population = 1000000  # Base for proportions
        
        for i, age_group in enumerate(self.age_groups):
            proportion = distribution[i] * np.random.uniform(0.9, 1.1)
            male_prop = proportion * np.random.uniform(0.48, 0.52)
            female_prop = proportion - male_prop
            
            age_start = int(age_group.split('-')[0]) if '-' in age_group else 80
            
            age_data.append({
                'country': country,
                'year': year,
                'age_group': age_group,
                'age_start': age_start,
                'age_end': 84 if age_group == '80+' else int(age_group.split('-')[1]),
                'male_population': int(male_prop * total_population),
                'female_population': int(female_prop * total_population),
                'total_population': int(proportion * total_population),
                'mortality_rate': np.random.exponential(1 / (100 - age_start)) if age_start < 100 else 0.2,
                'fertility_rate': max(0, np.random.normal(0.1, 0.05) * (30 - age_start) if 15 <= age_start <= 45 else 0),
                'labor_force_participation': np.random.beta(5, 2) if 20 <= age_start <= 65 else np.random.beta(2, 5),
                'dependency_ratio': 1 if age_start < 15 or age_start >= 65 else 0,
                'education_level': np.random.uniform(0.5, 1.0) * (1 - age_start/100),
                'income_level': np.random.lognormal(10, 1) * (min(age_start, 60)/60)
            })
        
        return pd.DataFrame(age_data)
EOF_CODE
)

# 无限循环
while true; do
    # 随机选择一种颜色主题
    theme=$((RANDOM % 5 + 1))
    case $theme in
        1) color=$GREEN ;;
        2) color=$YELLOW ;;
        3) color=$BLUE ;;
        4) color=$MAGENTA ;;
        5) color=$CYAN ;;
    esac

    # 逐字输出逻辑
    # 将 RAW_CODE 按行分割
    IFS=$'\n' read -rd '' -a lines <<< "$RAW_CODE"

    for line in "${lines[@]}"; do
        current_word=""
        buffer=""
        word_count=0
        chunk_size=1 # 每次输出1个“单词”，降低速度
        
        # 逐字符读取行
        len=${#line}
        for (( i=0; i<$len; i++ )); do
            char="${line:$i:1}"
            
            # 如果是空格或特殊符号，视为单词边界
            if [[ "$char" =~ [a-zA-Z0-9_] ]]; then
                current_word="${current_word}${char}"
            else
                # 输出之前的单词（如果有）并高亮
                if [[ -n "$current_word" ]]; then
                    # Python 高亮逻辑
                    case "$current_word" in
                        "import"|"from"|"as"|"return"|"if"|"else"|"elif"|"for"|"while"|"try"|"except"|"with"|"def"|"class"|"pass") color=$MAGENTA ;;
                        "True"|"False"|"None") color=$RED ;;
                        "print"|"len"|"range"|"int"|"float"|"str"|"list"|"dict"|"set"|"enumerate"|"zip") color=$YELLOW ;;
                        "pd"|"np"|"plt"|"sns"|"go"|"px"|"sm"|"stats"|"gpd"|"ctx") color=$CYAN ;;
                        "DataFrame"|"Series"|"PopulationMetrics"|"DemographicSegment"|"GeographicRegion"|"PopulationDataGenerator") color=$GREEN ;;
                        "self"|"__init__") color=$BLUE ;;
                        *) color=$WHITE ;;
                    esac
                    
                    # 积累单词到缓冲区
                    buffer="${buffer}${color}${current_word}${RESET}"
                    word_count=$((word_count + 1))

                    # 降低速度：每1个单词就等待输入
                    if [[ $word_count -ge $chunk_size ]]; then
                        read -rsn1 input
                        check_input "$input"
                        echo -ne "$buffer"
                        buffer=""
                        word_count=0
                    fi
                    
                    current_word=""
                fi
                
                # 输出当前的非单词字符（符号、空格等）
                case "$char" in
                    "{"|"}"|"["|"]") color=$GREEN ;;
                    "("|")") color=$GREEN ;;
                    "*"|"&"|"+"|"-"|"/"|"="|";"|",") color=$RED ;;
                    "'"|'"') color=$YELLOW ;;
                    "#") color=$GRAY ;;
                    *) color=$RESET ;;
                esac
                
                # 符号和空格也加入缓冲区
                buffer="${buffer}${color}${char}${RESET}"
                
                # 如果是换行符或者特殊符号，可能也需要触发输出
                if [[ "$char" == ";" || "$char" == ":" || "$char" == "{" || "$char" == "}" ]]; then
                     word_count=$((word_count + 1))
                fi
            fi
        done
        
        # 行尾处理
        if [[ -n "$current_word" ]]; then
            case "$current_word" in
                "import"|"from"|"as"|"return"|"if"|"else"|"elif"|"for"|"while"|"try"|"except"|"with"|"def"|"class"|"pass") color=$MAGENTA ;;
                "True"|"False"|"None") color=$RED ;;
                "print"|"len"|"range"|"int"|"float"|"str"|"list"|"dict"|"set"|"enumerate"|"zip") color=$YELLOW ;;
                "pd"|"np"|"plt"|"sns"|"go"|"px"|"sm"|"stats"|"gpd"|"ctx") color=$CYAN ;;
                "DataFrame"|"Series"|"PopulationMetrics"|"DemographicSegment"|"GeographicRegion"|"PopulationDataGenerator") color=$GREEN ;;
                "self"|"__init__") color=$BLUE ;;
                *) color=$WHITE ;;
            esac
            buffer="${buffer}${color}${current_word}${RESET}"
        fi
        
        # 行结束，强制输出缓冲区（保留换行符）
        if [[ -n "$buffer" ]]; then
            read -rsn1 input
            check_input "$input"
            echo -ne "$buffer"
            buffer=""
            word_count=0
        fi
        
        echo "" # 换行
    done
    
    echo ""
    echo ""
    
done
