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
    
    def generate_geographic_distribution_data(self) -> gpd.GeoDataFrame:
        """Generate geographic population distribution data"""
        logger.info("Generating geographic distribution data")
        
        # Create synthetic geographic data
        np.random.seed(42)
        
        # Generate random points around the world
        n_locations = 500
        lats = np.random.uniform(-60, 80, n_locations)
        lons = np.random.uniform(-180, 180, n_locations)
        
        # Create population clusters (simulating cities)
        cluster_centers = [
            (40.7, -74.0),   # New York
            (51.5, -0.1),    # London
            (35.7, 139.7),   # Tokyo
            (19.1, 72.9),    # Mumbai
            (-23.6, -46.7),  # Sao Paulo
            (31.2, 121.5),   # Shanghai
            (-33.9, 151.2),  # Sydney
            (55.8, 37.6),    # Moscow
            (48.9, 2.4),     # Paris
            (52.5, 13.4)     # Berlin
        ]
        
        data = []
        for i in range(n_locations):
            # Calculate distance to nearest cluster center
            distances = [np.sqrt((lats[i] - c[0])**2 + (lons[i] - c[1])**2) for c in cluster_centers]
            min_distance = min(distances)
            
            # Population density decays with distance from centers
            base_density = np.random.lognormal(3, 1)
            density = base_density * np.exp(-min_distance * 5)
            
            # Add some randomness
            density *= np.random.uniform(0.5, 1.5)
            
            # Determine country based on coordinates
            country = self._get_country_from_coords(lats[i], lons[i])
            region = self._get_region(country)
            
            # Calculate urban/rural classification
            if density > 1000:
                area_type = 'Urban'
            elif density > 100:
                area_type = 'Suburban'
            else:
                area_type = 'Rural'
            
            # Economic indicators correlated with density
            gdp_per_capita = np.random.lognormal(9, 0.5) * (1 + np.log1p(density)/10)
            
            data.append({
                'location_id': f"LOC{i:04d}",
                'country': country,
                'region': region,
                'latitude': lats[i],
                'longitude': lons[i],
                'population_density': density,
                'total_population': int(density * np.random.uniform(0.5, 2) * 1000),
                'urban_population': int(density * np.random.uniform(0.3, 0.9) * 1000) if area_type == 'Urban' else 0,
                'rural_population': int(density * np.random.uniform(0.1, 0.7) * 1000) if area_type != 'Urban' else 0,
                'area_km2': np.random.uniform(10, 10000),
                'gdp_per_capita': gdp_per_capita,
                'development_index': np.random.uniform(0.3, 0.95),
                'climate_zone': np.random.choice(['Tropical', 'Arid', 'Temperate', 'Continental', 'Polar']),
                'terrain_type': np.random.choice(['Coastal', 'Mountain', 'Plain', 'Plateau', 'Valley']),
                'water_access': np.random.uniform(0.1, 1.0),
                'agricultural_land': np.random.uniform(0, 0.8),
                'forest_cover': np.random.uniform(0, 0.7),
                'elevation': np.random.exponential(500),
                'distance_to_coast': np.random.exponential(200),
                'temperature': np.random.normal(15, 10),
                'precipitation': np.random.exponential(1000),
                'natural_hazards': np.random.poisson(0.5),
                'infrastructure_quality': np.random.uniform(0.2, 0.95),
                'healthcare_access': np.random.uniform(0.3, 0.98),
                'education_access': np.random.uniform(0.4, 0.97),
                'internet_penetration': np.random.beta(3, 2),
                'transport_connectivity': np.random.uniform(0.1, 0.9),
                'energy_availability': np.random.uniform(0.5, 1.0)
            })
        
        df = pd.DataFrame(data)
        
        # Create GeoDataFrame
        geometry = gpd.points_from_xy(df.longitude, df.latitude)
        gdf = gpd.GeoDataFrame(df, geometry=geometry, crs="EPSG:4326")
        
        return gdf
    
    def generate_migration_flows(self) -> pd.DataFrame:
        """Generate international migration flow data"""
        logger.info("Generating migration flow data")
        
        countries = self.countries
        years = range(2000, 2024)
        
        migration_data = []
        
        # Create migration probability matrix
        n_countries = len(countries)
        migration_matrix = np.zeros((n_countries, n_countries))
        
        # Higher migration between culturally/geographically close countries
        for i in range(n_countries):
            for j in range(n_countries):
                if i != j:
                    # Base migration probability
                    prob = np.random.exponential(0.01)
                    
                    # Increase probability for same region
                    if self._get_region(countries[i]) == self._get_region(countries[j]):
                        prob *= 2
                    
                    # Increase for developed to developed
                    if i < 10 and j < 10:  # First 10 countries considered "developed"
                        prob *= 1.5
                    
                    migration_matrix[i, j] = prob
        
        # Normalize rows
        migration_matrix = migration_matrix / migration_matrix.sum(axis=1, keepdims=True)
        
        for year in years:
            for i, origin in enumerate(countries):
                for j, destination in enumerate(countries):
                    if i != j:
                        # Base flow
                        base_flow = np.random.poisson(1000)
                        
                        # Apply migration probability
                        flow = int(base_flow * migration_matrix[i, j] * np.random.uniform(0.8, 1.2))
                        
                        # Add time trend
                        time_factor = 1 + (year - 2000) * 0.02
                        flow = int(flow * time_factor)
                        
                        if flow > 0:
                            migration_data.append({
                                'year': year,
                                'origin_country': origin,
                                'destination_country': destination,
                                'migrants': flow,
                                'origin_region': self._get_region(origin),
                                'destination_region': self._get_region(destination),
                                'distance_km': self._calculate_distance(origin, destination),
                                'gdp_ratio': np.random.lognormal(0, 0.5),
                                'language_similarity': np.random.uniform(0, 1),
                                'colonial_ties': np.random.choice([0, 1], p=[0.8, 0.2]),
                                'visa_restrictions': np.random.choice([0, 0.5, 1], p=[0.3, 0.5, 0.2]),
                                'conflict_in_origin': np.random.binomial(1, 0.1),
                                'economic_opportunity': np.random.uniform(0, 1),
                                'family_reunification': np.random.beta(2, 5),
                                'education_opportunity': np.random.beta(3, 4)
                            })
        
        return pd.DataFrame(migration_data)
    
    def generate_historical_population_timeline(self, country: str) -> pd.DataFrame:
        """Generate historical population timeline for a specific country"""
        logger.info(f"Generating historical timeline for {country}")
        
        # Historical population data (approximate)
        historical_data = {
            'China': [(1950, 550), (1960, 660), (1970, 820), (1980, 980), 
                     (1990, 1140), (2000, 1260), (2010, 1340), (2020, 1420)],
            'India': [(1950, 376), (1960, 449), (1970, 554), (1980, 696),
                     (1990, 870), (2000, 1050), (2010, 1240), (2020, 1380)],
            'United States': [(1950, 152), (1960, 180), (1970, 205), (1980, 227),
                            (1990, 250), (2000, 282), (2010, 310), (2020, 331)],
            'Japan': [(1950, 83), (1960, 93), (1970, 104), (1980, 117),
                     (1990, 124), (2000, 127), (2010, 128), (2020, 126)]
        }
        
        data = []
        
        if country in historical_data:
            base_data = historical_data[country]
            
            # Interpolate for all years
            years = np.arange(1950, 2024)
            populations = np.interp(years, 
                                   [d[0] for d in base_data], 
                                   [d[1] for d in base_data])
            
            for year, pop in zip(years, populations):
                # Add historical events
                historical_events = self._get_historical_events(country, year)
                
                data.append({
                    'year': int(year),
                    'country': country,
                    'population_millions': pop,
                    'birth_rate': max(5, 40 - (year - 1950) * 0.5 + np.random.normal(0, 2)),
                    'death_rate': max(5, 20 - (year - 1950) * 0.3 + np.random.normal(0, 1)),
                    'life_expectancy': 40 + (year - 1950) * 0.35 + np.random.normal(0, 2),
                    'urbanization_rate': min(0.9, 0.2 + (year - 1950) * 0.01),
                    'gdp_per_capita': 1000 * (1.03 ** (year - 1950)) * np.random.uniform(0.8, 1.2),
                    'major_events': historical_events['events'],
                    'event_impact': historical_events['impact'],
                    'war_conflict': historical_events['conflict'],
                    'natural_disaster': historical_events['disaster'],
                    'economic_crisis': historical_events['crisis'],
                    'policy_change': historical_events['policy'],
                    'technological_breakthrough': historical_events['technology'],
                    'disease_outbreak': historical_events['disease'],
                    'education_reform': historical_events['education'],
                    'healthcare_improvement': historical_events['healthcare']
                })
        
        return pd.DataFrame(data)
    
    def _get_region(self, country: str) -> str:
        """Get region for a country"""
        for region, countries in self.regions.items():
            if country in countries:
                return region
        return 'Other'
    
    def _get_country_from_coords(self, lat: float, lon: float) -> str:
        """Determine country from coordinates (simplified)"""
        # Simplified geographic assignment
        if 24 < lat < 50 and -125 < lon < -66:
            return 'United States'
        elif 18 < lat < 54 and 73 < lon < 136:
            return 'China'
        elif 8 < lat < 37 and 68 < lon < 97:
            return 'India'
        elif 35 < lat < 46 and 128 < lon < 146:
            return 'Japan'
        elif 47 < lat < 55 and 6 < lon < 15:
            return 'Germany'
        elif 50 < lat < 59 and -8 < lon < 2:
            return 'United Kingdom'
        elif 41 < lat < 52 and -5 < lon < 10:
            return 'France'
        elif -34 < lat < 5 and -74 < lon < -35:
            return 'Brazil'
        elif 36 < lat < 47 and 6 < lon < 19:
            return 'Italy'
        elif 42 < lat < 83 and -141 < lon < -52:
            return 'Canada'
        else:
            return np.random.choice(self.countries)
    
    def _calculate_distance(self, country1: str, country2: str) -> float:
        """Calculate approximate distance between countries"""
        # Simplified distances (in km)
        distances = {
            ('United States', 'Canada'): 2000,
            ('United States', 'Mexico'): 3000,
            ('Germany', 'France'): 1000,
            ('China', 'Japan'): 2000,
            ('India', 'China'): 3000,
            ('United Kingdom', 'United States'): 6000,
            ('Australia', 'United Kingdom'): 17000,
        }
        
        key = tuple(sorted([country1, country2]))
        return distances.get(key, np.random.uniform(1000, 15000))
    
    def _get_historical_events(self, country: str, year: int) -> Dict[str, Any]:
        """Get historical events for a country in a given year"""
        events = {
            'events': '',
            'impact': 0,
            'conflict': 0,
            'disaster': 0,
            'crisis': 0,
            'policy': 0,
            'technology': 0,
            'disease': 0,
            'education': 0,
            'healthcare': 0
        }
        
        # Country-specific historical events
        if country == 'China':
            if year == 1960:
                events.update({'events': 'Great Leap Forward', 'impact': -0.2, 'crisis': 0.8})
            elif year == 1978:
                events.update({'events': 'Economic Reforms', 'impact': 0.3, 'policy': 0.9})
            elif year == 2008:
                events.update({'events': 'Beijing Olympics', 'impact': 0.1, 'technology': 0.5})
        
        elif country == 'United States':
            if 1964 <= year <= 1973:
                events.update({'events': 'Vietnam War', 'impact': -0.1, 'conflict': 0.7})
            elif year == 2008:
                events.update({'events': 'Financial Crisis', 'impact': -0.2, 'crisis': 0.9})
            elif year == 2020:
                events.update({'events': 'COVID-19 Pandemic', 'impact': -0.15, 'disease': 0.8})
        
        elif country == 'Japan':
            if year == 2011:
                events.update({'events': 'Tsunami and Fukushima', 'impact': -0.25, 'disaster': 0.9})
        
        return events


# ============================================================================
# DATA PROCESSING AND FEATURE ENGINEERING MODULE
# ============================================================================

class PopulationDataProcessor:
    """Advanced data processing and feature engineering for population data"""
    
    def __init__(self):
        self.scaler = StandardScaler()
        self.encoders = {}
        self.feature_columns = []
        self.target_columns = []
        
    def preprocess_world_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Preprocess world population data with feature engineering"""
        logger.info("Preprocessing world population data")
        
        # Create a copy to avoid modifying original
        processed_df = df.copy()
        
        # 1. Handle missing values
        processed_df = self._handle_missing_values(processed_df)
        
        # 2. Feature engineering - temporal features
        processed_df = self._create_temporal_features(processed_df)
        
        # 3. Feature engineering - demographic indicators
        processed_df = self._create_demographic_features(processed_df)
        
        # 4. Feature engineering - economic indicators
        processed_df = self._create_economic_features(processed_df)
        
        # 5. Feature engineering - social indicators
        processed_df = self._create_social_features(processed_df)
        
        # 6. Feature engineering - environmental indicators
        processed_df = self._create_environmental_features(processed_df)
        
        # 7. Create lag features for time series
        processed_df = self._create_lag_features(processed_df)
        
        # 8. Create rolling statistics
        processed_df = self._create_rolling_features(processed_df)
        
        # 9. Create interaction terms
        processed_df = self._create_interaction_features(processed_df)
        
        # 10. Create polynomial features for key variables
        processed_df = self._create_polynomial_features(processed_df)
        
        # 11. Normalize numerical features
        processed_df = self._normalize_features(processed_df)
        
        # 12. Encode categorical variables
        processed_df = self._encode_categorical_features(processed_df)
        
        # 13. Create target variables for prediction
        processed_df = self._create_target_variables(processed_df)
        
        logger.info(f"Preprocessing complete. Original shape: {df.shape}, Processed shape: {processed_df.shape}")
        return processed_df
    
    def _handle_missing_values(self, df: pd.DataFrame) -> pd.DataFrame:
        """Handle missing values in the dataset"""
        # For time series, forward fill then backward fill
        df = df.sort_values(['country', 'year'])
        
        # Group by country and fill missing values
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        categorical_cols = df.select_dtypes(exclude=[np.number]).columns
        
        # For numeric columns, interpolate within each country
        for col in numeric_cols:
            df[col] = df.groupby('country')[col].transform(
                lambda x: x.interpolate(method='linear', limit_direction='both')
            )
        
        # Fill any remaining NaNs with median/mode
        for col in df.columns:
            if df[col].dtype in [np.float64, np.int64]:
                df[col].fillna(df[col].median(), inplace=True)
            elif df[col].dtype == 'object':
                df[col].fillna(df[col].mode()[0] if not df[col].mode().empty else 'Unknown', inplace=True)
        
        return df
    
    def _create_temporal_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create temporal features from year column"""
        df = df.copy()
        
        # Basic temporal features
        df['decade'] = (df['year'] // 10) * 10
        df['half_century'] = (df['year'] // 50) * 50
        df['year_sin'] = np.sin(2 * np.pi * df['year'] / 100)
        df['year_cos'] = np.cos(2 * np.pi * df['year'] / 100)
        
        # Time since reference point
        df['years_since_1950'] = df['year'] - 1950
        df['years_since_2000'] = df['year'] - 2000
        
        # Economic cycle phases (simplified)
        df['economic_cycle'] = np.sin(2 * np.pi * (df['year'] - 1950) / 10)
        
        # Seasonality indicators (if monthly data existed)
        df['quarter'] = ((df['year'] % 4) + 1)  # Simplified
        
        return df
    
    def _create_demographic_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create advanced demographic features"""
        df = df.copy()
        
        # Population growth metrics
        df['population_growth_pct'] = df.groupby('country')['population'].pct_change() * 100
        df['population_growth_abs'] = df.groupby('country')['population'].diff()
        
        # Demographic transition stage
        df['demographic_transition'] = np.where(
            (df['birth_rate'] > 30) & (df['death_rate'] > 20), 'Stage 1',
            np.where((df['birth_rate'] > 20) & (df['death_rate'] < 15), 'Stage 2',
                    np.where((df['birth_rate'] < 20) & (df['death_rate'] < 10), 'Stage 3', 'Stage 4'))
        )
        
        # Age structure indicators
        df['youth_dependency'] = df['dependency_ratio'] * 0.6  # Approximation
        df['elderly_dependency'] = df['dependency_ratio'] * 0.4  # Approximation
        df['working_age_ratio'] = 1 - df['dependency_ratio']
        
        # Sex ratio indicators
        df['sex_ratio_deviation'] = df['sex_ratio'] - 100
        df['male_surplus'] = np.where(df['sex_ratio'] > 105, 1, 0)
        
        # Fertility analysis
        df['fertility_deviation'] = df['fertility_rate'] - 2.1  # Replacement level
        df['below_replacement'] = np.where(df['fertility_rate'] < 2.1, 1, 0)
        
        # Mortality analysis
        df['premature_mortality'] = df['death_rate'] * (70 - df['life_expectancy'].clip(upper=70)) / 70
        
        # Migration impact
        df['net_migration_rate'] = df['migration_rate']
        df['migration_impact'] = df['net_migration_rate'] / df['growth_rate'].clip(lower=0.1)
        
        # Urbanization stage
        df['urbanization_stage'] = np.where(
            df['urbanization_rate'] < 0.3, 'Early',
            np.where(df['urbanization_rate'] < 0.6, 'Mid',
                    np.where(df['urbanization_rate'] < 0.8, 'Late', 'Mature'))
        )
        
        # Demographic dividend indicator
        df['demographic_dividend'] = (
            (df['working_age_ratio'] > 0.65) & 
            (df['dependency_ratio'] < 0.5) &
            (df['fertility_rate'] < 3)
        ).astype(int)
        
        # Population momentum
        df['population_momentum'] = df['fertility_rate'] * df['youth_dependency']
        
        return df
    
    def _create_economic_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create economic features"""
        df = df.copy()
        
        # GDP metrics
        df['gdp_total_log'] = np.log1p(df['gdp_total'])
        df['gdp_per_capita_log'] = np.log1p(df['gdp_per_capita'])
        df['gdp_growth'] = df.groupby('country')['gdp_total'].pct_change() * 100
        
        # Economic development stage
        df['development_stage'] = np.where(
            df['gdp_per_capita'] < 1000, 'Low Income',
            np.where(df['gdp_per_capita'] < 4000, 'Lower Middle',
                    np.where(df['gdp_per_capita'] < 12000, 'Upper Middle',
                            'High Income'))
        )
        
        # Economic complexity
        df['economic_complexity'] = np.log1p(df['gdp_total']) * df['urbanization_rate'] * df['education_index']
        
        # Productivity measures
        df['labor_productivity'] = df['gdp_total'] / (df['population'] * df['working_age_ratio'])
        df['capital_intensity'] = np.log1p(df['gdp_total']) / np.log1p(df['population'])
        
        # Income inequality proxy
        df['inequality_proxy'] = 1 / (1 + np.exp(-0.1 * (df['gdp_per_capita'] - 5000)))
        
        # Economic stability
        df['gdp_volatility'] = df.groupby('country')['gdp_growth'].rolling(5, min_periods=3).std().reset_index(level=0, drop=True)
        
        # Investment indicators
        df['investment_rate'] = np.random.uniform(0.1, 0.4, len(df))  # Placeholder
        df['savings_rate'] = np.random.uniform(0.05, 0.3, len(df))  # Placeholder
        
        return df
    
    def _create_social_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create social development features"""
        df = df.copy()
        
        # Human development composite
        df['human_development_index'] = (
            df['life_expectancy'] / 85 +  # Health
            df['education_index'] +       # Education
            df['gdp_per_capita_log'] / 12  # Income (normalized)
        ) / 3
        
        # Social inequality measures
        df['gender_inequality'] = 1 - (df['literacy_rate'] * 0.3 + df['education_index'] * 0.4 + (1 - df['unemployment_rate']/100) * 0.3)
        
        # Education metrics
        df['education_gap'] = 1 - df['education_index']
        df['literacy_deviation'] = df['literacy_rate'] - 0.9  # Target 90%
        
        # Healthcare metrics
        df['healthcare_gap'] = 1 - df['healthcare_index']
        df['life_expectancy_gap'] = 85 - df['life_expectancy']  # Target 85 years
        
        # Poverty metrics
        df['poverty_severity'] = df['poverty_rate'] * (1 - df['gdp_per_capita'] / 20000).clip(lower=0)
        
        # Social stability
        df['social_stability'] = (
            (1 - df['unemployment_rate']/100) * 0.3 +
            (1 - df['poverty_rate']/100) * 0.3 +
            df['political_stability'] * 0.2 +
            df['happiness_index']/10 * 0.2
        )
        
        # Digital development
        df['digital_divide'] = 1 - df['digital_adoption']
        df['tech_readiness'] = df['digital_adoption'] * df['education_index'] * np.log1p(df['gdp_per_capita'])
        
        # Social mobility proxy
        df['social_mobility'] = df['education_index'] * (1 - df['inequality_proxy']) * df['digital_adoption']
        
        return df
    
    def _create_environmental_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create environmental sustainability features"""
        df = df.copy()
        
        # Environmental pressure
        df['ecological_footprint'] = df['co2_emissions'] * df['energy_consumption'] * df['population_density'] / 1000
        df['carbon_intensity'] = df['co2_emissions'] / df['gdp_per_capita'].clip(lower=1)
        
        # Resource constraints
        df['water_stress_index'] = df['water_stress'] * (df['population_density'] / 100)
        df['food_security_index'] = df['food_security'] / (1 + df['population_growth_pct']/100)
        
        # Environmental sustainability
        df['environmental_sustainability'] = (
            (1 - df['ecological_footprint']/df['ecological_footprint'].max()) * 0.4 +
            (1 - df['water_stress_index']) * 0.3 +
            df['forest_cover'] * 0.3
        )
        
        # Climate vulnerability
        df['climate_vulnerability'] = (
            df['water_stress'] * 0.25 +
            (1 - df['food_security']) * 0.25 +
            df['natural_hazards'] * 0.25 +
            (1 - df['infrastructure_quality']) * 0.25
        )
        
        # Renewable energy potential
        df['renewable_potential'] = np.random.uniform(0.1, 0.9, len(df))  # Placeholder
        
        return df
    
    def _create_lag_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create lagged features for time series analysis"""
        df = df.sort_values(['country', 'year'])
        
        # Columns to create lags for
        lag_columns = [
            'population', 'birth_rate', 'death_rate', 'gdp_per_capita',
            'urbanization_rate', 'life_expectancy', 'fertility_rate'
        ]
        
        # Create lags 1-5 years
        for col in lag_columns:
            for lag in [1, 2, 3, 4, 5]:
                df[f'{col}_lag_{lag}'] = df.groupby('country')[col].shift(lag)
        
        # Create differences
        for col in lag_columns:
            df[f'{col}_diff_1'] = df.groupby('country')[col].diff(1)
            df[f'{col}_diff_5'] = df.groupby('country')[col].diff(5)
        
        return df
    
    def _create_rolling_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create rolling statistics features"""
        df = df.sort_values(['country', 'year'])
        
        rolling_columns = [
            'population', 'birth_rate', 'death_rate', 'gdp_growth',
            'urbanization_rate', 'life_expectancy'
        ]
        
        for col in rolling_columns:
            # Rolling means
            for window in [3, 5, 10]:
                df[f'{col}_rolling_mean_{window}'] = df.groupby('country')[col].rolling(window, min_periods=2).mean().reset_index(level=0, drop=True)
            
            # Rolling standard deviations
            for window in [5, 10]:
                df[f'{col}_rolling_std_{window}'] = df.groupby('country')[col].rolling(window, min_periods=3).std().reset_index(level=0, drop=True)
            
            # Exponential moving averages
            df[f'{col}_ema_3'] = df.groupby('country')[col].transform(lambda x: x.ewm(span=3).mean())
            df[f'{col}_ema_5'] = df.groupby('country')[col].transform(lambda x: x.ewm(span=5).mean())
        
        return df
    
    def _create_interaction_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create interaction features between important variables"""
        
        # Demographic interactions
        df['birth_death_ratio'] = df['birth_rate'] / df['death_rate'].clip(lower=0.1)
        df['pop_density_gdp'] = df['population_density'] * np.log1p(df['gdp_per_capita'])
        df['urban_education'] = df['urbanization_rate'] * df['education_index']
        df['life_exp_gdp'] = df['life_expectancy'] * np.log1p(df['gdp_per_capita'])
        
        # Economic-demographic interactions
        df['gdp_pop_growth'] = df['gdp_growth'] * df['population_growth_pct']
        df['fertility_education'] = df['fertility_rate'] * (1 - df['education_index'])
        
        # Social-environmental interactions
        df['health_env'] = df['healthcare_index'] * (1 - df['ecological_footprint']/df['ecological_footprint'].max())
        df['edu_tech'] = df['education_index'] * df['digital_adoption']
        
        # Complex interactions
        df['development_triangle'] = (
            df['human_development_index'] * 
            df['economic_complexity'] * 
            df['environmental_sustainability']
        )
        
        return df
    
    def _create_polynomial_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create polynomial features for key variables"""
        
        key_variables = [
            'gdp_per_capita', 'life_expectancy', 'urbanization_rate',
            'education_index', 'fertility_rate'
        ]
        
        for var in key_variables:
            df[f'{var}_squared'] = df[var] ** 2
            df[f'{var}_cubed'] = df[var] ** 3
            df[f'{var}_log'] = np.log1p(df[var])
            df[f'{var}_sqrt'] = np.sqrt(df[var].clip(lower=0))
        
        return df
    
    def _normalize_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Normalize numerical features"""
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        
        # Exclude year and other ID columns from normalization
        exclude_cols = ['year', 'decade', 'half_century', 'years_since_1950', 
                       'years_since_2000', 'quarter', 'country_encoded']
        normalize_cols = [col for col in numeric_cols if col not in exclude_cols]
        
        # Apply robust scaling (less sensitive to outliers)
        for col in normalize_cols:
            if df[col].std() > 0:  # Avoid division by zero
                median = df[col].median()
                iqr = df[col].quantile(0.75) - df[col].quantile(0.25)
                if iqr > 0:
                    df[f'{col}_scaled'] = (df[col] - median) / iqr
        
        return df
    
    def _encode_categorical_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Encode categorical features"""
        
        # Country encoding (target encoding based on average population)
        if 'country' in df.columns:
            country_means = df.groupby('country')['population'].mean()
            df['country_encoded'] = df['country'].map(country_means)
        
        # Region encoding
        if 'region' in df.columns:
            region_dict = {region: i for i, region in enumerate(df['region'].unique())}
            df['region_encoded'] = df['region'].map(region_dict)
        
        # Development stage encoding
        if 'development_stage' in df.columns:
            stage_order = {'Low Income': 0, 'Lower Middle': 1, 'Upper Middle': 2, 'High Income': 3}
            df['development_stage_encoded'] = df['development_stage'].map(stage_order)
        
        # One-hot encoding for other categoricals
        categorical_cols = df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            if col not in ['country', 'region'] and df[col].nunique() <= 10:
                dummies = pd.get_dummies(df[col], prefix=col, drop_first=True)
                df = pd.concat([df, dummies], axis=1)
        
        return df
    
    def _create_target_variables(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create target variables for predictive modeling"""
        
        # Population growth target (next 5 years)
        df = df.sort_values(['country', 'year'])
        df['population_next_5'] = df.groupby('country')['population'].shift(-5)
        df['pop_growth_5yr'] = ((df['population_next_5'] / df['population']) ** (1/5) - 1) * 100
        
        # Birth rate target (next year)
        df['birth_rate_next'] = df.groupby('country')['birth_rate'].shift(-1)
        
        # Life expectancy target (next 10 years)
        df['life_exp_next_10'] = df.groupby('country')['life_expectancy'].shift(-10)
        
        # Urbanization target (next 20 years)
        df['urban_next_20'] = df.groupby('country')['urbanization_rate'].shift(-20)
        
        # Binary classification targets
        df['high_growth'] = (df['population_growth_pct'] > df['population_growth_pct'].median()).astype(int)
        df['aging_population'] = (df['median_age'] > 40).astype(int)
        df['urban_majority'] = (df['urbanization_rate'] > 0.5).astype(int)
        
        # Multi-class target: Development stage in 10 years
        df['future_development'] = df.groupby('country')['development_stage_encoded'].shift(-10)
        
        return df
    
    def prepare_training_data(self, df: pd.DataFrame, target: str = 'pop_growth_5yr') -> Tuple[pd.DataFrame, pd.Series]:
        """Prepare data for machine learning training"""
        
        # Remove rows with missing targets
        df_clean = df.dropna(subset=[target])
        
        # Select feature columns (exclude targets and identifiers)
        exclude_cols = [
            'country', 'region', 'year', 'population_next_5', 'birth_rate_next',
            'life_exp_next_10', 'urban_next_20', 'future_development'
        ]
        
        # Also exclude the target and other future targets
        future_targets = [col for col in df.columns if 'next' in col or 'future' in col]
        exclude_cols.extend(future_targets)
        
        feature_cols = [col for col in df_clean.columns if col not in exclude_cols]
        
        # Separate features and target
        X = df_clean[feature_cols].copy()
        y = df_clean[target].copy()
        
        # Remove any remaining NaN values
        nan_mask = X.isna().any(axis=1) | y.isna()
        X = X[~nan_mask]
        y = y[~nan_mask]
        
        # Store feature and target columns
        self.feature_columns = list(X.columns)
        self.target_columns = target
        
        logger.info(f"Training data prepared: X shape = {X.shape}, y shape = {y.shape}")
        return X, y


# ============================================================================
# ADVANCED VISUALIZATION MODULE
# ============================================================================

class PopulationVisualizer:
    """Advanced population data visualization with multiple chart types"""
    
    def __init__(self, style: str = 'darkgrid'):
        """Initialize visualizer with style preferences"""
        plt.style.use(f'seaborn-v0_8-{style}')
        self.colors = {
            'primary': ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D', '#3B1F2B'],
            'sequential': ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', 
                          '#4292c6', '#2171b5', '#08519c', '#08306b'],
            'diverging': ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7',
                         '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'],
            'categorical': ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
                           '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
        }
        self.figure_count = 0
        
    def create_comprehensive_dashboard(self, df: pd.DataFrame, country: str = None) -> None:
        """Create a comprehensive dashboard of population metrics"""
        logger.info(f"Creating comprehensive dashboard for {country if country else 'all countries'}")
        
        if country:
            df_filtered = df[df['country'] == country].copy()
            title_suffix = f" - {country}"
        else:
            df_filtered = df.copy()
            title_suffix = " - Global"
        
        # Create figure with multiple subplots
        fig = plt.figure(figsize=(20, 25))
        fig.suptitle(f'Population Analytics Dashboard{title_suffix}', fontsize=24, fontweight='bold', y=0.98)
        
        # 1. Population Trend with Confidence Interval
        ax1 = plt.subplot(6, 4, 1)
        self._plot_population_trend_with_ci(ax1, df_filtered, country)
        
        # 2. Demographic Transition
        ax2 = plt.subplot(6, 4, 2)
        self._plot_demographic_transition(ax2, df_filtered)
        
        # 3. Age Structure Pyramid (Latest Year)
        ax3 = plt.subplot(6, 4, 3)
        if country:
            latest_year = df_filtered['year'].max()
            age_data = self._get_age_structure_data(df_filtered, latest_year)
            if age_data is not None:
                self._plot_population_pyramid(ax3, age_data)
        
        # 4. Fertility vs Life Expectancy
        ax4 = plt.subplot(6, 4, 4)
        self._plot_fertility_life_expectancy(ax4, df_filtered)
        
        # 5. Urbanization Trend
        ax5 = plt.subplot(6, 4, 5)
        self._plot_urbanization_trend(ax5, df_filtered)
        
        # 6. Economic Development vs Population
        ax6 = plt.subplot(6, 4, 6)
        self._plot_economic_development(ax6, df_filtered)
        
        # 7. Correlation Heatmap
        ax7 = plt.subplot(6, 4, 7)
        self._plot_correlation_matrix(ax7, df_filtered)
        
        # 8. Population Density Map
        ax8 = plt.subplot(6, 4, 8)
        self._plot_population_density(ax8, df_filtered)
        
        # 9. Growth Rate Decomposition
        ax9 = plt.subplot(6, 4, 9)
        self._plot_growth_decomposition(ax9, df_filtered)
        
        # 10. Dependency Ratios
        ax10 = plt.subplot(6, 4, 10)
        self._plot_dependency_ratios(ax10, df_filtered)
        
        # 11. Education vs Fertility
        ax11 = plt.subplot(6, 4, 11)
        self._plot_education_fertility(ax11, df_filtered)
        
        # 12. Healthcare vs Life Expectancy
        ax12 = plt.subplot(6, 4, 12)
        self._plot_healthcare_life_expectancy(ax12, df_filtered)
        
        # 13. Time Series Decomposition
        ax13 = plt.subplot(6, 4, (13, 14))
        if country and len(df_filtered) > 10:
            self._plot_time_series_decomposition(ax13, df_filtered, 'population')
        
        # 14. Forecast Projection
        ax14 = plt.subplot(6, 4, (15, 16))
        if country and len(df_filtered) > 10:
            self._plot_population_forecast(ax14, df_filtered)
        
        # 15. Migration Patterns
        ax15 = plt.subplot(6, 4, 17)
        self._plot_migration_patterns(ax15, df_filtered)
        
        # 16. Environmental Indicators
        ax16 = plt.subplot(6, 4, 18)
        self._plot_environmental_indicators(ax16, df_filtered)
        
        # 17. Social Development Index
        ax17 = plt.subplot(6, 4, 19)
        self._plot_social_development(ax17, df_filtered)
        
        # 18. Radar Chart of Key Metrics
        ax18 = plt.subplot(6, 4, 20)
        if country:
            self._plot_radar_chart(ax18, df_filtered)
        
        # 19. Statistical Summary
        ax19 = plt.subplot(6, 4, (21, 22))
        self._plot_statistical_summary(ax19, df_filtered)
        
        # 20. Comparative Analysis
        ax20 = plt.subplot(6, 4, (23, 24))
        self._plot_comparative_analysis(ax20, df, country)
        
        plt.tight_layout(rect=[0, 0, 1, 0.96])
        
        # Save figure
        filename = f"dashboard_{country.replace(' ', '_') if country else 'global'}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
        plt.savefig(f'output_charts/{filename}', dpi=300, bbox_inches='tight')
        plt.show()
        
        logger.info(f"Dashboard saved as {filename}")
    
    def create_interactive_visualizations(self, df: pd.DataFrame) -> None:
        """Create interactive visualizations using Plotly"""
        logger.info("Creating interactive visualizations")
        
        # 1. Interactive Population Trend
        fig1 = go.Figure()
        
        for country in df['country'].unique()[:10]:  # Limit to 10 countries for clarity
            country_data = df[df['country'] == country]
            fig1.add_trace(go.Scatter(
                x=country_data['year'],
                y=country_data['population'],
                mode='lines+markers',
                name=country,
                hovertemplate='<b>%{text}</b><br>' +
                            'Year: %{x}<br>' +
                            'Population: %{y:,.0f}<br>' +
                            'Growth Rate: %{customdata:.2f}%<extra></extra>',
                text=[country] * len(country_data),
                customdata=country_data['growth_rate'].values
            ))
        
        fig1.update_layout(
            title='Global Population Trends (Interactive)',
            xaxis_title='Year',
            yaxis_title='Population',
            hovermode='closest',
            template='plotly_white',
            height=600
        )
        
        fig1.write_html('output_charts/interactive_population_trends.html')
        
        # 2. 3D Scatter Plot: GDP vs Life Expectancy vs Population
        latest_data = df[df['year'] == df['year'].max()]
        
        fig2 = go.Figure(data=go.Scatter3d(
            x=np.log(latest_data['gdp_per_capita']),
            y=latest_data['life_expectancy'],
            z=np.log(latest_data['population']),
            mode='markers',
            marker=dict(
                size=latest_data['urbanization_rate'] * 20,
                color=latest_data['growth_rate'],
                colorscale='Viridis',
                showscale=True,
                colorbar=dict(title='Growth Rate')
            ),
            text=latest_data['country'],
            hovertemplate='<b>%{text}</b><br>' +
                        'GDP per capita: $%{x:,.0f}<br>' +
                        'Life Expectancy: %{y:.1f} years<br>' +
                        'Population: %{z:,.0f}<br>' +
                        'Urbanization: %{marker.size:.1%}<extra></extra>'
        ))
        
        fig2.update_layout(
            title='3D: GDP vs Life Expectancy vs Population',
            scene=dict(
                xaxis_title='Log(GDP per capita)',
                yaxis_title='Life Expectancy',
                zaxis_title='Log(Population)'
            ),
            height=700
        )
        
        fig2.write_html('output_charts/3d_scatter_plot.html')
        
        # 3. Animated Bubble Chart
        fig3 = px.scatter(df[df['country'].isin(df['country'].unique()[:15])],  # Limit countries
                         x='gdp_per_capita',
                         y='life_expectancy',
                         size='population',
                         color='region',
                         hover_name='country',
                         animation_frame='year',
                         animation_group='country',
                         log_x=True,
                         size_max=60,
                         range_x=[100, 100000],
                         range_y=[30, 90])
        
        fig3.update_layout(
            title='Population Development Over Time (Animated)',
            xaxis_title='GDP per Capita (log scale)',
            yaxis_title='Life Expectancy',
            height=600
        )
        
        fig3.write_html('output_charts/animated_bubble_chart.html')
        
        # 4. Sunburst Chart: Hierarchical Population Data
        fig4 = px.sunburst(df[df['year'] == df['year'].max()],
                          path=['region', 'country'],
                          values='population',
                          color='growth_rate',
                          color_continuous_scale='RdBu',
                          color_continuous_midpoint=df['growth_rate'].median())
        
        fig4.update_layout(
            title='Population Distribution by Region and Country',
            height=700
        )
        
        fig4.write_html('output_charts/sunburst_chart.html')
        
        # 5. Parallel Coordinates Plot
        numeric_cols = ['population', 'gdp_per_capita', 'life_expectancy', 
                       'urbanization_rate', 'growth_rate', 'fertility_rate']
        
        fig5 = px.parallel_coordinates(
            latest_data[numeric_cols + ['country']],
            color='growth_rate',
            dimensions=numeric_cols,
            color_continuous_scale=px.colors.diverging.Tealrose,
            labels={col: col.replace('_', ' ').title() for col in numeric_cols}
        )
        
        fig5.update_layout(
            title='Parallel Coordinates: Population Metrics',
            height=600
        )
        
        fig5.write_html('output_charts/parallel_coordinates.html')
        
        logger.info("Interactive visualizations created and saved as HTML files")
    
    def create_specialized_charts(self, df: pd.DataFrame) -> None:
        """Create specialized statistical charts"""
        
        # 1. Ridgeline Plot for Population Distribution
        fig, axes = joypy.joyplot(
            data=df.pivot_table(index='year', columns='country', values='population').iloc[:, :10],
            figsize=(12, 8),
            colormap=cm.viridis,
            overlap=2,
            linewidth=1
        )
        
        plt.title('Population Distribution Ridgeline Plot', fontsize=16, fontweight='bold')
        plt.xlabel('Population (millions)')
        plt.ylabel('Year')
        plt.savefig('output_charts/ridgeline_population.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # 2. Violin Plot for Growth Rates by Region
        plt.figure(figsize=(12, 8))
        sns.violinplot(data=df, x='region', y='growth_rate', palette='Set2')
        plt.title('Growth Rate Distribution by Region', fontsize=16, fontweight='bold')
        plt.xlabel('Region')
        plt.ylabel('Growth Rate (%)')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig('output_charts/violin_growth_rates.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # 3. Hexbin Plot: GDP vs Life Expectancy
        plt.figure(figsize=(12, 8))
        hb = plt.hexbin(df['gdp_per_capita'], df['life_expectancy'], 
                        gridsize=50, cmap='YlOrRd', mincnt=1)
        plt.colorbar(hb, label='Count')
        plt.xscale('log')
        plt.title('Hexbin: GDP per Capita vs Life Expectancy', fontsize=16, fontweight='bold')
        plt.xlabel('GDP per Capita (log scale)')
        plt.ylabel('Life Expectancy')
        plt.savefig('output_charts/hexbin_gdp_life.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # 4. Stacked Area Chart: Population by Region Over Time
        region_pop = df.pivot_table(index='year', columns='region', 
                                   values='population', aggfunc='sum')
        
        plt.figure(figsize=(14, 8))
        region_pop.plot.area(alpha=0.8, cmap='Set3')
        plt.title('Population by Region Over Time', fontsize=16, fontweight='bold')
        plt.xlabel('Year')
        plt.ylabel('Total Population')
        plt.legend(title='Region', bbox_to_anchor=(1.05, 1), loc='upper left')
        plt.tight_layout()
        plt.savefig('output_charts/stacked_area_regions.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # 5. Treemap of Population Distribution
        latest_year = df['year'].max()
        latest_data = df[df['year'] == latest_year]
        
        plt.figure(figsize=(14, 10))
        squarify.plot(sizes=latest_data['population'].head(20),
                     label=latest_data['country'].head(20),
                     alpha=0.8,
                     color=plt.cm.tab20c.colors)
        plt.title(f'Population Treemap ({latest_year})', fontsize=18, fontweight='bold')
        plt.axis('off')
        plt.savefig('output_charts/treemap_population.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # 6. Network Graph of Migration Flows
        migration_data = self._generate_migration_matrix(df)
        
        G = nx.DiGraph()
        for _, row in migration_data.iterrows():
            if row['migrants'] > 10000:  # Only significant flows
                G.add_edge(row['origin_country'], row['destination_country'], 
                          weight=row['migrants'])
        
        plt.figure(figsize=(16, 12))
        pos = nx.spring_layout(G, k=2, iterations=50)
        
        # Draw nodes
        nx.draw_networkx_nodes(G, pos, node_size=[G.degree(node) * 100 for node in G.nodes()],
                              node_color='lightblue', alpha=0.8)
        
        # Draw edges with width proportional to flow
        edges = G.edges(data=True)
        edge_widths = [d['weight'] / 100000 for (_, _, d) in edges]
        nx.draw_networkx_edges(G, pos, width=edge_widths, alpha=0.5, edge_color='gray')
        
        # Draw labels
        nx.draw_networkx_labels(G, pos, font_size=10, font_weight='bold')
        
        plt.title('Migration Flow Network', fontsize=18, fontweight='bold')
        plt.axis('off')
        plt.tight_layout()
        plt.savefig('output_charts/migration_network.png', dpi=300, bbox_inches='tight')
        plt.show()
    
    def _plot_population_trend_with_ci(self, ax, df, country=None):
        """Plot population trend with confidence intervals"""
        if country:
            data = df[df['country'] == country]
            ax.plot(data['year'], data['population'], linewidth=3, color=self.colors['primary'][0])
            ax.fill_between(data['year'], 
                           data['population'] * 0.95, 
                           data['population'] * 1.05,
                           alpha=0.3, color=self.colors['primary'][0])
            ax.set_title(f'Population Trend: {country}', fontweight='bold')
        else:
            # Plot multiple countries
            for i, country in enumerate(df['country'].unique()[:5]):
                country_data = df[df['country'] == country]
                ax.plot(country_data['year'], country_data['population'], 
                       linewidth=2, label=country, color=self.colors['categorical'][i])
            ax.set_title('Population Trends (Top 5 Countries)', fontweight='bold')
            ax.legend()
        
        ax.set_xlabel('Year')
        ax.set_ylabel('Population')
        ax.grid(True, alpha=0.3)
        ax.ticklabel_format(style='scientific', axis='y', scilimits=(0,0))
    
    def _plot_demographic_transition(self, ax, df):
        """Plot demographic transition (birth vs death rates)"""
        latest_year = df['year'].max()
        latest_data = df[df['year'] == latest_year]
        
        scatter = ax.scatter(latest_data['birth_rate'], latest_data['death_rate'],
                           c=latest_data['gdp_per_capita'], 
                           s=latest_data['population']/1000000,
                           cmap='viridis', alpha=0.7, edgecolors='black', linewidth=0.5)
        
        # Add country labels for outliers
        for idx, row in latest_data.iterrows():
            if row['birth_rate'] > 30 or row['death_rate'] > 15:
                ax.annotate(row['country'][:3], 
                           (row['birth_rate'], row['death_rate']),
                           fontsize=8, alpha=0.7)
        
        ax.set_xlabel('Birth Rate (‰)')
        ax.set_ylabel('Death Rate (‰)')
        ax.set_title('Demographic Transition', fontweight='bold')
        ax.grid(True, alpha=0.3)
        
        # Add diagonal line (birth = death)
        lims = [min(ax.get_xlim()[0], ax.get_ylim()[0]), 
                max(ax.get_xlim()[1], ax.get_ylim()[1])]
        ax.plot(lims, lims, 'k--', alpha=0.3, label='Birth = Death')
        ax.set_xlim(lims)
        ax.set_ylim(lims)
        
        # Add colorbar
        plt.colorbar(scatter, ax=ax, label='GDP per Capita')
    
    def _plot_population_pyramid(self, ax, age_data):
        """Plot population pyramid (age structure)"""
        # Separate male and female populations
        male_pop = age_data['male_population']
        female_pop = age_data['female_population']
        age_groups = age_data['age_group']
        
        # Create horizontal bars
        y_pos = np.arange(len(age_groups))
        
        ax.barh(y_pos, -male_pop, color='#1f77b4', alpha=0.8, label='Male')
        ax.barh(y_pos, female_pop, color='#e377c2', alpha=0.8, label='Female')
        
        ax.set_yticks(y_pos)
        ax.set_yticklabels(age_groups)
        ax.set_xlabel('Population')
        ax.set_title('Population Pyramid', fontweight='bold')
        ax.legend()
        ax.grid(True, alpha=0.3, axis='x')
        
        # Format x-axis with absolute values
        ax.xaxis.set_major_formatter(FuncFormatter(lambda x, p: f'{abs(int(x)):,}'))
    
    def _plot_fertility_life_expectancy(self, ax, df):
        """Plot fertility rate vs life expectancy"""
        latest_year = df['year'].max()
        latest_data = df[df['year'] == latest_year]
        
        # Create bubble chart
        scatter = ax.scatter(latest_data['fertility_rate'], 
                           latest_data['life_expectancy'],
                           s=latest_data['population']/50000000,  # Scale bubble size
                           c=latest_data['urbanization_rate'],
                           cmap='plasma', alpha=0.7, edgecolors='black', linewidth=0.5)
        
        # Add trend line
        z = np.polyfit(latest_data['fertility_rate'], 
                      latest_data['life_expectancy'], 1)
        p = np.poly1d(z)
        ax.plot(np.sort(latest_data['fertility_rate']), 
               p(np.sort(latest_data['fertility_rate'])), 
               'r--', alpha=0.8, linewidth=2)
        
        ax.set_xlabel('Fertility Rate')
        ax.set_ylabel('Life Expectancy')
        ax.set_title('Fertility vs Life Expectancy', fontweight='bold')
        ax.grid(True, alpha=0.3)
        
        # Add colorbar
        plt.colorbar(scatter, ax=ax, label='Urbanization Rate')
        
        # Add annotation for interesting countries
        for idx, row in latest_data.iterrows():
            if row['fertility_rate'] < 1.5 or row['life_expectancy'] > 80:
                ax.annotate(row['country'][:3], 
                           (row['fertility_rate'], row['life_expectancy']),
                           fontsize=8, alpha=0.7)
    
    def _plot_urbanization_trend(self, ax, df):
        """Plot urbanization trend over time"""
        if 'country' in df.columns and len(df['country'].unique()) == 1:
            # Single country
            ax.plot(df['year'], df['urbanization_rate'], linewidth=3, 
                   color=self.colors['primary'][2])
            ax.set_title('Urbanization Trend', fontweight='bold')
        else:
            # Multiple countries
            for i, country in enumerate(df['country'].unique()[:5]):
                country_data = df[df['country'] == country]
                ax.plot(country_data['year'], country_data['urbanization_rate'], 
                       linewidth=2, label=country, color=self.colors['categorical'][i])
            ax.set_title('Urbanization Trends (Top 5)', fontweight='bold')
            ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        
        ax.set_xlabel('Year')
        ax.set_ylabel('Urbanization Rate')
        ax.grid(True, alpha=0.3)
        ax.yaxis.set_major_formatter(FuncFormatter(lambda y, _: f'{y:.0%}'))
    
    def _plot_economic_development(self, ax, df):
        """Plot economic development indicators"""
        latest_year = df['year'].max()
        latest_data = df[df['year'] == latest_year]
        
        # Create grouped bar chart
        countries = latest_data.nlargest(8, 'gdp_per_capita')['country']
        filtered_data = latest_data[latest_data['country'].isin(countries)]
        
        x = np.arange(len(countries))
        width = 0.35
        
        # Normalize GDP and population for comparison
        gdp_normalized = filtered_data['gdp_per_capita'] / filtered_data['gdp_per_capita'].max()
        pop_normalized = filtered_data['population'] / filtered_data['population'].max()
        
        ax.bar(x - width/2, gdp_normalized, width, label='GDP per Capita', 
              color=self.colors['primary'][0], alpha=0.8)
        ax.bar(x + width/2, pop_normalized, width, label='Population', 
              color=self.colors['primary'][2], alpha=0.8)
        
        ax.set_xlabel('Country')
        ax.set_ylabel('Normalized Value')
        ax.set_title('Economic vs Population Size', fontweight='bold')
        ax.set_xticks(x)
        ax.set_xticklabels(countries, rotation=45, ha='right')
        ax.legend()
        ax.grid(True, alpha=0.3, axis='y')
    
    def _plot_correlation_matrix(self, ax, df):
        """Plot correlation matrix of key variables"""
        numeric_cols = ['population', 'gdp_per_capita', 'life_expectancy', 
                       'urbanization_rate', 'growth_rate', 'fertility_rate',
                       'birth_rate', 'death_rate', 'education_index', 'healthcare_index']
        
        # Select only columns that exist
        existing_cols = [col for col in numeric_cols if col in df.columns]
        corr_data = df[existing_cols].corr()
        
        # Create heatmap
        im = ax.imshow(corr_data, cmap='coolwarm', vmin=-1, vmax=1, aspect='auto')
        
        # Add colorbar
        plt.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
        
        # Add text annotations
        for i in range(len(existing_cols)):
            for j in range(len(existing_cols)):
                text = ax.text(j, i, f'{corr_data.iloc[i, j]:.2f}',
                             ha="center", va="center", color="w" if abs(corr_data.iloc[i, j]) > 0.5 else "black",
                             fontsize=8)
        
        ax.set_xticks(np.arange(len(existing_cols)))
        ax.set_yticks(np.arange(len(existing_cols)))
        ax.set_xticklabels([col[:10] for col in existing_cols], rotation=45, ha='right')
        ax.set_yticklabels([col[:10] for col in existing_cols])
        ax.set_title('Correlation Matrix', fontweight='bold')
    
    def _plot_population_density(self, ax, df):
        """Plot population density map"""
        if 'latitude' in df.columns and 'longitude' in df.columns:
            # Scatter plot of geographic locations
            scatter = ax.scatter(df['longitude'], df['latitude'],
                               c=df['population_density'],
                               s=df['population']/1000000,
                               cmap='YlOrRd', alpha=0.7, edgecolors='black', linewidth=0.5)
            
            ax.set_xlabel('Longitude')
            ax.set_ylabel('Latitude')
            ax.set_title('Population Density Map', fontweight='bold')
            ax.grid(True, alpha=0.3)
            
            # Add colorbar
            plt.colorbar(scatter, ax=ax, label='Population Density')
            
            # Set aspect ratio for map
            ax.set_aspect('equal', adjustable='box')
        else:
            # Alternative: Bar chart of density by country
            latest_year = df['year'].max()
            latest_data = df[df['year'] == latest_year]
            top_countries = latest_data.nlargest(10, 'population_density')
            
            bars = ax.barh(range(len(top_countries)), top_countries['population_density'],
                         color=self.colors['sequential'][3:], alpha=0.8)
            
            ax.set_yticks(range(len(top_countries)))
            ax.set_yticklabels(top_countries['country'])
            ax.set_xlabel('Population Density')
            ax.set_title('Top 10 Countries by Density', fontweight='bold')
            ax.grid(True, alpha=0.3, axis='x')
    
    def _plot_growth_decomposition(self, ax, df):
        """Decompose population growth into components"""
        if 'country' in df.columns and len(df['country'].unique()) == 1:
            country_data = df.copy()
            
            # Calculate components
            natural_increase = country_data['birth_rate'] - country_data['death_rate']
            net_migration = country_data.get('migration_rate', np.zeros(len(country_data)))
            
            # Create stacked area chart
            years = country_data['year']
            ax.fill_between(years, 0, natural_increase, 
                           alpha=0.6, label='Natural Increase', color='green')
            ax.fill_between(years, natural_increase, natural_increase + net_migration,
                           alpha=0.6, label='Net Migration', color='blue')
            
            ax.set_xlabel('Year')
            ax.set_ylabel('Growth Rate Components (‰)')
            ax.set_title('Growth Rate Decomposition', fontweight='bold')
            ax.legend()
            ax.grid(True, alpha=0.3)
        else:
            ax.text(0.5, 0.5, 'Select single country\nfor decomposition',
                   ha='center', va='center', transform=ax.transAxes, fontsize=12)
            ax.set_title('Growth Decomposition', fontweight='bold')
            ax.axis('off')
    
    def _plot_dependency_ratios(self, ax, df):
        """Plot dependency ratios over time"""
        if 'youth_dependency' in df.columns and 'elderly_dependency' in df.columns:
            if 'country' in df.columns and len(df['country'].unique()) == 1:
                # Single country
                years = df['year']
                ax.fill_between(years, 0, df['youth_dependency'], 
                               alpha=0.6, label='Youth Dependency', color='lightblue')
                ax.fill_between(years, df['youth_dependency'], 
                               df['youth_dependency'] + df['elderly_dependency'],
                               alpha=0.6, label='Elderly Dependency', color='lightcoral')
                
                ax.set_xlabel('Year')
                ax.set_ylabel('Dependency Ratio')
                ax.set_title('Dependency Ratios Over Time', fontweight='bold')
                ax.legend()
                ax.grid(True, alpha=0.3)
            else:
                # Multiple countries - show latest year comparison
                latest_year = df['year'].max()
                latest_data = df[df['year'] == latest_year]
                top_countries = latest_data.nlargest(8, 'dependency_ratio')
                
                x = np.arange(len(top_countries))
                width = 0.35
                
                ax.bar(x - width/2, top_countries['youth_dependency'], width,
                      label='Youth', color='lightblue', alpha=0.8)
                ax.bar(x + width/2, top_countries['elderly_dependency'], width,
                      label='Elderly', color='lightcoral', alpha=0.8)
                
                ax.set_xlabel('Country')
                ax.set_ylabel('Dependency Ratio')
                ax.set_title('Dependency Ratios by Country', fontweight='bold')
                ax.set_xticks(x)
                ax.set_xticklabels(top_countries['country'], rotation=45, ha='right')
                ax.legend()
                ax.grid(True, alpha=0.3, axis='y')
        else:
            ax.text(0.5, 0.5, 'Dependency data\nnot available',
                   ha='center', va='center', transform=ax.transAxes, fontsize=12)
            ax.set_title('Dependency Ratios', fontweight='bold')
            ax.axis('off')
    
    def _plot_education_fertility(self, ax, df):
        """Plot education vs fertility relationship"""
        latest_year = df['year'].max()
        latest_data = df[df['year'] == latest_year]
        
        # Scatter plot with regression line
        scatter = ax.scatter(latest_data['education_index'], 
                           latest_data['fertility_rate'],
                           c=latest_data['gdp_per_capita'],
                           s=latest_data['population']/50000000,
                           cmap='viridis', alpha=0.7, edgecolors='black', linewidth=0.5)
        
        # Add regression line
        if len(latest_data) > 2:
            x = latest_data['education_index'].values
            y = latest_data['fertility_rate'].values
            mask = ~np.isnan(x) & ~np.isnan(y)
            if mask.sum() > 2:
                coeffs = np.polyfit(x[mask], y[mask], 1)
                poly = np.poly1d(coeffs)
                x_range = np.linspace(x.min(), x.max(), 100)
                ax.plot(x_range, poly(x_range), 'r--', linewidth=2, alpha=0.8)
        
        ax.set_xlabel('Education Index')
        ax.set_ylabel('Fertility Rate')
        ax.set_title('Education vs Fertility', fontweight='bold')
        ax.grid(True, alpha=0.3)
        
        # Add colorbar
        plt.colorbar(scatter, ax=ax, label='GDP per Capita')
    
    def _plot_healthcare_life_expectancy(self, ax, df):
        """Plot healthcare index vs life expectancy"""
        latest_year = df['year'].max()
        latest_data = df[df['year'] == latest_year]
        
        # Create bubble chart
        scatter = ax.scatter(latest_data['healthcare_index'], 
                           latest_data['life_expectancy'],
                           s=latest_data['population']/50000000,
                           c=latest_data['urbanization_rate'],
                           cmap='plasma', alpha=0.7, edgecolors='black', linewidth=0.5)
        
        ax.set_xlabel('Healthcare Index')
        ax.set_ylabel('Life Expectancy')
        ax.set_title('Healthcare vs Life Expectancy', fontweight='bold')
        ax.grid(True, alpha=0.3)
        
        # Add colorbar
        plt.colorbar(scatter, ax=ax, label='Urbanization Rate')
        
        # Add annotation for countries with exceptional values
        for idx, row in latest_data.iterrows():
            if row['life_expectancy'] > 80 or row['healthcare_index'] > 0.9:
                ax.annotate(row['country'][:3], 
                           (row['healthcare_index'], row['life_expectancy']),
                           fontsize=8, alpha=0.7)
    
    def _plot_time_series_decomposition(self, ax, df, variable):
        """Decompose time series into trend, seasonal, and residual components"""
        try:
            # Prepare data for decomposition
            if 'country' in df.columns and len(df['country'].unique()) == 1:
                country_data = df.set_index('year')[variable].sort_index()
                
                # Perform seasonal decomposition
                decomposition = seasonal_decompose(country_data, model='additive', period=10)
                
                # Plot components
                axes_decomp = [ax]  # This will be modified for subplots
                # Note: In actual implementation, this would create subplots
                # For now, just plot trend
                ax.plot(decomposition.trend, linewidth=2, color='red')
                ax.set_title(f'{variable} - Trend Component', fontweight='bold')
                ax.set_xlabel('Year')
                ax.set_ylabel(variable)
                ax.grid(True, alpha=0.3)
            else:
                ax.text(0.5, 0.5, 'Select single country\nfor decomposition',
                       ha='center', va='center', transform=ax.transAxes, fontsize=12)
                ax.set_title('Time Series Decomposition', fontweight='bold')
                ax.axis('off')
        except Exception as e:
            ax.text(0.5, 0.5, f'Decomposition error:\n{str(e)[:50]}',
                   ha='center', va='center', transform=ax.transAxes, fontsize=10)
            ax.set_title('Time Series Decomposition', fontweight='bold')
            ax.axis('off')
    
    def _plot_population_forecast(self, ax, df):
        """Plot population forecast using multiple models"""
        if 'country' in df.columns and len(df['country'].unique()) == 1 and len(df) > 10:
            country_data = df.set_index('year')['population'].sort_index()
            
            # Simple forecasting models
            years = country_data.index.values
            pop = country_data.values
            
            # Linear forecast
            coeffs = np.polyfit(years, np.log(pop), 1)
            forecast_years = np.arange(years.min(), years.max() + 20)
            linear_forecast = np.exp(coeffs[1] + coeffs[0] * forecast_years)
            
            # Exponential smoothing forecast
            from statsmodels.tsa.holtwinters import SimpleExpSmoothing
            model = SimpleExpSmoothing(pop).fit()
            exp_forecast = model.forecast(20)
            exp_years = np.arange(years.max() + 1, years.max() + 21)
            
            # Plot historical and forecasts
            ax.plot(years, pop, 'o-', linewidth=2, label='Historical', color='black')
            ax.plot(forecast_years, linear_forecast, '--', linewidth=2, 
                   label='Linear Forecast', color='red', alpha=0.7)
            ax.plot(exp_years, exp_forecast, '--', linewidth=2,
                   label='Exp Smoothing Forecast', color='blue', alpha=0.7)
            
            ax.set_xlabel('Year')
            ax.set_ylabel('Population')
            ax.set_title('Population Forecast', fontweight='bold')
            ax.legend()
            ax.grid(True, alpha=0.3)
            ax.ticklabel_format(style='scientific', axis='y', scilimits=(0,0))
        else:
            ax.text(0.5, 0.5, 'Select single country\nwith sufficient data',
                   ha='center', va='center', transform=ax.transAxes, fontsize=12)
            ax.set_title('Population Forecast', fontweight='bold')
            ax.axis('off')
    
    def _plot_migration_patterns(self, ax, df):
        """Plot migration patterns and flows"""
        if 'migration_rate' in df.columns:
            if 'country' in df.columns and len(df['country'].unique()) == 1:
                # Single country migration trend
                ax.plot(df['year'], df['migration_rate'], linewidth=3, 
                       color=self.colors['primary'][3])
                ax.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
                ax.fill_between(df['year'], 0, df['migration_rate'], 
                               where=df['migration_rate'] > 0, 
                               alpha=0.3, color='green')
                ax.fill_between(df['year'], 0, df['migration_rate'], 
                               where=df['migration_rate'] < 0, 
                               alpha=0.3, color='red')
                
                ax.set_xlabel('Year')
                ax.set_ylabel('Net Migration Rate (‰)')
                ax.set_title('Migration Trend', fontweight='bold')
                ax.grid(True, alpha=0.3)
            else:
                # Multiple countries - show latest year comparison
                latest_year = df['year'].max()
                latest_data = df[df['year'] == latest_year]
                # Get top positive and negative migration countries
                top_positive = latest_data.nlargest(5, 'migration_rate')
                top_negative = latest_data.nsmallest(5, 'migration_rate')
                migration_data = pd.concat([top_positive, top_negative])
                
                colors = ['green' if x > 0 else 'red' for x in migration_data['migration_rate']]
                bars = ax.barh(range(len(migration_data)), migration_data['migration_rate'],
                             color=colors, alpha=0.8)
                
                ax.set_yticks(range(len(migration_data)))
                ax.set_yticklabels(migration_data['country'])
                ax.set_xlabel('Net Migration Rate (‰)')
                ax.set_title('Migration Leaders/Laggards', fontweight='bold')
                ax.grid(True, alpha=0.3, axis='x')
                ax.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
        else:
            ax.text(0.5, 0.5, 'Migration data\nnot available',
                   ha='center', va='center', transform=ax.transAxes, fontsize=12)
            ax.set_title('Migration Patterns', fontweight='bold')
            ax.axis('off')
    
    def _plot_environmental_indicators(self, ax, df):
        """Plot environmental sustainability indicators"""
        env_indicators = ['co2_emissions', 'energy_consumption', 'water_stress', 'forest_cover']
        existing_indicators = [ind for ind in env_indicators if ind in df.columns]
        
        if existing_indicators and 'country' in df.columns and len(df['country'].unique()) == 1:
            # Single country environmental trends
            for i, indicator in enumerate(existing_indicators):
                ax.plot(df['year'], df[indicator], label=indicator.replace('_', ' ').title(),
                       linewidth=2, color=self.colors['categorical'][i])
            
            ax.set_xlabel('Year')
            ax.set_ylabel('Environmental Indicators')
            ax.set_title('Environmental Trends', fontweight='bold')
            ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
            ax.grid(True, alpha=0.3)
        elif existing_indicators:
            # Multiple countries - radar chart for latest year
            latest_year = df['year'].max()
            latest_data = df[df['year'] == latest_year]
            
            # Normalize indicators for radar chart
            normalized_data = latest_data[existing_indicators].copy()
            for col in existing_indicators:
                if normalized_data[col].max() > normalized_data[col].min():
                    normalized_data[col] = (normalized_data[col] - normalized_data[col].min()) / \
                                          (normalized_data[col].max() - normalized_data[col].min())
            
            # Plot top 3 countries
            top_countries = latest_data.nlargest(3, 'population')['country']
            for i, country in enumerate(top_countries):
                country_values = normalized_data[latest_data['country'] == country].values[0]
                angles = np.linspace(0, 2 * np.pi, len(existing_indicators), endpoint=False)
                country_values = np.concatenate((country_values, [country_values[0]]))
                angles = np.concatenate((angles, [angles[0]]))
                
                ax.plot(angles, country_values, 'o-', linewidth=2, label=country,
                       color=self.colors['categorical'][i])
                ax.fill(angles, country_values, alpha=0.1, color=self.colors['categorical'][i])
            
            ax.set_xticks(angles[:-1])
            ax.set_xticklabels([ind[:10] for ind in existing_indicators])
            ax.set_title('Environmental Indicators Comparison', fontweight='bold')
            ax.legend()
            ax.grid(True, alpha=0.3)
        else:
            ax.text(0.5, 0.5, 'Environmental data\nnot available',
                   ha='center', va='center', transform=ax.transAxes, fontsize=12)
            ax.set_title('Environmental Indicators', fontweight='bold')
            ax.axis('off')
    
    def _plot_social_development(self, ax, df):
        """Plot social development indicators"""
        social_indicators = ['education_index', 'healthcare_index', 'literacy_rate', 
                            'happiness_index', 'digital_adoption']
        existing_indicators = [ind for ind in social_indicators if ind in df.columns]
        
        if existing_indicators:
            latest_year = df['year'].max()
            latest_data = df[df['year'] == latest_year]
            
            # Create parallel coordinates-like visualization
            normalized_data = latest_data[existing_indicators + ['country']].copy()
            for col in existing_indicators:
                if normalized_data[col].max() > normalized_data[col].min():
                    normalized_data[col] = (normalized_data[col] - normalized_data[col].min()) / \
                                          (normalized_data[col].max() - normalized_data[col].min())
            
            # Plot lines for top 5 countries
            top_countries = latest_data.nlargest(5, 'gdp_per_capita')['country']
            for i, country in enumerate(top_countries):
                country_values = normalized_data[normalized_data['country'] == country][existing_indicators].values[0]
                ax.plot(range(len(existing_indicators)), country_values, 'o-', 
                       linewidth=2, label=country, color=self.colors['categorical'][i])
            
            ax.set_xticks(range(len(existing_indicators)))
            ax.set_xticklabels([ind.replace('_', '\n').title()[:15] for ind in existing_indicators])
            ax.set_ylabel('Normalized Value')
            ax.set_title('Social Development Indicators', fontweight='bold')
            ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
            ax.grid(True, alpha=0.3)
        else:
            ax.text(0.5, 0.5, 'Social development data\nnot available',
                   ha='center', va='center', transform=ax.transAxes, fontsize=12)
            ax.set_title('Social Development', fontweight='bold')
            ax.axis('off')
    
    def _plot_radar_chart(self, ax, df):
        """Plot radar chart of key metrics for selected country"""
        if 'country' in df.columns and len(df['country'].unique()) == 1:
            latest_year = df['year'].max()
            country_data = df[df['year'] == latest_year].iloc[0]
            
            # Select key metrics
            metrics = ['growth_rate', 'life_expectancy', 'gdp_per_capita', 
                      'urbanization_rate', 'education_index', 'healthcare_index']
            labels = ['Growth', 'Life Exp', 'GDP', 'Urban', 'Edu', 'Health']
            
            # Normalize values
            values = []
            for metric in metrics:
                if metric in country_data:
                    # Simple normalization for radar chart
                    if metric == 'growth_rate':
                        # Growth rate: normalize between -5 and 10
                        norm_value = (country_data[metric] + 5) / 15
                    elif metric == 'life_expectancy':
                        # Life expectancy: normalize between 40 and 90
                        norm_value = (country_data[metric] - 40) / 50
                    elif metric == 'gdp_per_capita':
                        # GDP: log normalization
                        norm_value = np.log1p(country_data[metric]) / 15
                    else:
                        # Other metrics: assume 0-1 range
                        norm_value = min(1, max(0, country_data[metric]))
                    values.append(norm_value)
                else:
                    values.append(0)
            
            # Complete the circle
            values.append(values[0])
            angles = np.linspace(0, 2 * np.pi, len(labels), endpoint=False).tolist()
            angles.append(angles[0])
            labels.append(labels[0])
            
            # Plot radar chart
            ax.plot(angles, values, 'o-', linewidth=2, color=self.colors['primary'][0])
            ax.fill(angles, values, alpha=0.25, color=self.colors['primary'][0])
            ax.set_xticks(angles[:-1])
            ax.set_xticklabels(labels[:-1])
            ax.set_title('Country Performance Radar', fontweight='bold')
            ax.grid(True, alpha=0.3)
        else:
            ax.text(0.5, 0.5, 'Select single country\nfor radar chart',
                   ha='center', va='center', transform=ax.transAxes, fontsize=12)
            ax.set_title('Performance Radar', fontweight='bold')
            ax.axis('off')
    
    def _plot_statistical_summary(self, ax, df):
        """Plot statistical summary and distributions"""
        ax.axis('off')
        
        # Calculate key statistics
        if 'population' in df.columns:
            pop_stats = df['population'].describe()
            growth_stats = df['growth_rate'].describe() if 'growth_rate' in df.columns else pd.Series()
            
            stats_text = "POPULATION STATISTICS\n" + "="*30 + "\n"
            stats_text += f"Mean Population: {pop_stats.get('mean', 0):,.0f}\n"
            stats_text += f"Median Population: {pop_stats.get('50%', 0):,.0f}\n"
            stats_text += f"Std Deviation: {pop_stats.get('std', 0):,.0f}\n"
            stats_text += f"Minimum: {pop_stats.get('min', 0):,.0f}\n"
            stats_text += f"Maximum: {pop_stats.get('max', 0):,.0f}\n\n"
            
            if not growth_stats.empty:
                stats_text += "GROWTH RATE STATISTICS\n" + "="*30 + "\n"
                stats_text += f"Mean Growth: {growth_stats.get('mean', 0):.2f}%\n"
                stats_text += f"Median Growth: {growth_stats.get('50%', 0):.2f}%\n"
                stats_text += f"Std Deviation: {growth_stats.get('std', 0):.2f}\n"
                stats_text += f"Minimum: {growth_stats.get('min', 0):.2f}%\n"
                stats_text += f"Maximum: {growth_stats.get('max', 0):.2f}%\n"
            
            ax.text(0.1, 0.95, stats_text, transform=ax.transAxes, fontsize=10,
                   verticalalignment='top', bbox=dict(boxstyle='round', facecolor='lightblue', alpha=0.3))
        else:
            ax.text(0.5, 0.5, 'No population data\navailable for summary',
                   ha='center', va='center', transform=ax.transAxes, fontsize=12)
    
    def _plot_comparative_analysis(self, ax, df, selected_country=None):
        """Plot comparative analysis with other countries"""
        if selected_country and 'country' in df.columns:
            # Compare selected country with regional average and global average
            latest_year = df['year'].max()
            latest_data = df[df['year'] == latest_year]
            
            if selected_country in latest_data['country'].values:
                country_data = latest_data[latest_data['country'] == selected_country].iloc[0]
                region = country_data.get('region', 'Unknown')
                
                # Calculate regional average
                regional_avg = latest_data[latest_data['region'] == region].mean()
                global_avg = latest_data.mean()
                
                # Prepare comparison data
                comparison_metrics = ['population', 'growth_rate', 'life_expectancy', 
                                     'gdp_per_capita', 'urbanization_rate']
                existing_metrics = [m for m in comparison_metrics if m in country_data.index]
                
                if existing_metrics:
                    # Create grouped bar chart
                    x = np.arange(len(existing_metrics))
                    width = 0.25
                    
                    country_values = [country_data[m] for m in existing_metrics]
                    regional_values = [regional_avg.get(m, 0) for m in existing_metrics]
                    global_values = [global_avg.get(m, 0) for m in existing_metrics]
                    
                    # Normalize for comparison
                    max_values = np.maximum.reduce([country_values, regional_values, global_values])
                    country_norm = country_values / max_values
                    regional_norm = regional_values / max_values
                    global_norm = global_values / max_values
                    
                    ax.bar(x - width, country_norm, width, label=selected_country, 
                          color=self.colors['primary'][0], alpha=0.8)
                    ax.bar(x, regional_norm, width, label=f'{region} Avg', 
                          color=self.colors['primary'][1], alpha=0.8)
                    ax.bar(x + width, global_norm, width, label='Global Avg', 
                          color=self.colors['primary'][2], alpha=0.8)
                    
                    ax.set_xticks(x)
                    ax.set_xticklabels([m.replace('_', '\n').title()[:10] for m in existing_metrics])
                    ax.set_ylabel('Normalized Value')
                    ax.set_title(f'{selected_country} vs Averages', fontweight='bold')
                    ax.legend()
                    ax.grid(True, alpha=0.3, axis='y')
                else:
                    ax.text(0.5, 0.5, 'Insufficient data\nfor comparison',
                           ha='center', va='center', transform=ax.transAxes, fontsize=12)
                    ax.set_title('Comparative Analysis', fontweight='bold')
                    ax.axis('off')
            else:
                ax.text(0.5, 0.5, 'Country not found\nin latest data',
                       ha='center', va='center', transform=ax.transAxes, fontsize=12)
                ax.set_title('Comparative Analysis', fontweight='bold')
                ax.axis('off')
        else:
            ax.text(0.5, 0.5, 'Select a country\nfor comparison',
                   ha='center', va='center', transform=ax.transAxes, fontsize=12)
            ax.set_title('Comparative Analysis', fontweight='bold')
            ax.axis('off')
    
    def _get_age_structure_data(self, df, year):
        """Get age structure data for a specific year"""
        # This would typically come from a separate dataset
        # For now, return None to indicate no data
        return None
    
    def _generate_migration_matrix(self, df):
        """Generate migration matrix from data"""
        # Simplified migration matrix generation
        # In a real implementation, this would use actual migration data
        migration_data = []
        countries = df['country'].unique()[:10]  # Limit to 10 countries
        
        for origin in countries:
            for destination in countries:
                if origin != destination:
                    migration_data.append({
                        'origin_country': origin,
                        'destination_country': destination,
                        'migrants': np.random.poisson(10000)
                    })
        
        return pd.DataFrame(migration_data)


# ============================================================================
# PREDICTIVE MODELING AND FORECASTING MODULE
# ============================================================================

class PopulationPredictor:
    """Advanced predictive modeling for population forecasting"""
    
    def __init__(self):
        self.models = {}
        self.scaler = StandardScaler()
        self.feature_importance = {}
        self.best_models = {}
        self.forecast_results = {}
        
    def train_ensemble_models(self, X: pd.DataFrame, y: pd.Series, test_size: float = 0.2) -> Dict[str, Any]:
        """Train multiple machine learning models for population prediction"""
        logger.info("Training ensemble of predictive models")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, shuffle=False
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Define models to train
        models = {
            'LinearRegression': LinearRegression(),
            'Ridge': Ridge(alpha=1.0),
            'Lasso': Lasso(alpha=0.1),
            'RandomForest': RandomForestRegressor(n_estimators=100, random_state=42),
            'GradientBoosting': GradientBoostingRegressor(n_estimators=100, random_state=42),
            'SVR': SVR(kernel='rbf', C=100, gamma=0.1, epsilon=0.1),
            'MLP': MLPRegressor(hidden_layer_sizes=(100, 50), max_iter=1000, random_state=42)
        }
        
        results = {}
        
        for name, model in models.items():
            logger.info(f"Training {name}...")
            
            try:
                # Train model
                model.fit(X_train_scaled, y_train)
                
                # Make predictions
                y_pred_train = model.predict(X_train_scaled)
                y_pred_test = model.predict(X_test_scaled)
                
                # Calculate metrics
                train_rmse = np.sqrt(mean_squared_error(y_train, y_pred_train))
                test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
                train_mae = mean_absolute_error(y_train, y_pred_train)
                test_mae = mean_absolute_error(y_test, y_pred_test)
                train_r2 = r2_score(y_train, y_pred_train)
                test_r2 = r2_score(y_test, y_pred_test)
                
                # Store model and results
                self.models[name] = model
                results[name] = {
                    'model': model,
                    'train_rmse': train_rmse,
                    'test_rmse': test_rmse,
                    'train_mae': train_mae,
                    'test_mae': test_mae,
                    'train_r2': train_r2,
                    'test_r2': test_r2,
                    'y_pred_train': y_pred_train,
                    'y_pred_test': y_pred_test
                }
                
                # Calculate feature importance for tree-based models
                if hasattr(model, 'feature_importances_'):
                    importances = model.feature_importances_
                    self.feature_importance[name] = pd.DataFrame({
                        'feature': X.columns,
                        'importance': importances
                    }).sort_values('importance', ascending=False)
                
                logger.info(f"{name}: Test R² = {test_r2:.4f}, Test RMSE = {test_rmse:.4f}")
                
            except Exception as e:
                logger.error(f"Error training {name}: {str(e)}")
                continue
        
        # Find best model based on test R²
        if results:
            best_model_name = max(results.keys(), key=lambda x: results[x]['test_r2'])
            self.best_models['regression'] = results[best_model_name]
            logger.info(f"Best model: {best_model_name} with R² = {results[best_model_name]['test_r2']:.4f}")
        
        return results
    
    def perform_time_series_forecasting(self, series: pd.Series, steps: int = 10) -> Dict[str, Any]:
        """Perform time series forecasting using multiple methods"""
        logger.info(f"Performing time series forecasting for {steps} steps")
        
        # Ensure series is sorted and has no missing values
        series = series.sort_index()
        series = series.interpolate(method='linear')
        
        results = {}
        
        # 1. ARIMA model
        try:
            from statsmodels.tsa.arima.model import ARIMA
            
            # Fit ARIMA model (auto-select order for simplicity)
            model_arima = ARIMA(series, order=(1, 1, 1))
            model_fit_arima = model_arima.fit()
            forecast_arima = model_fit_arima.forecast(steps=steps)
            ci_arima = model_fit_arima.get_forecast(steps=steps).conf_int()
            
            results['ARIMA'] = {
                'forecast': forecast_arima,
                'confidence_interval': ci_arima,
                'model': model_fit_arima,
                'aic': model_fit_arima.aic
            }
        except Exception as e:
            logger.warning(f"ARIMA failed: {str(e)}")
        
        # 2. Exponential Smoothing
        try:
            from statsmodels.tsa.holtwinters import ExponentialSmoothing
            
            model_ets = ExponentialSmoothing(series, trend='add', seasonal=None)
            model_fit_ets = model_ets.fit()
            forecast_ets = model_fit_ets.forecast(steps=steps)
            
            results['ExponentialSmoothing'] = {
                'forecast': forecast_ets,
                'model': model_fit_ets,
                'sse': model_fit_ets.sse
            }
        except Exception as e:
            logger.warning(f"Exponential Smoothing failed: {str(e)}")
        
        # 3. Prophet (Facebook's forecasting tool)
        try:
            from prophet import Prophet
            
            # Prepare data for Prophet
            df_prophet = pd.DataFrame({
                'ds': series.index,
                'y': series.values
            })
            
            model_prophet = Prophet(
                yearly_seasonality=True,
                weekly_seasonality=False,
                daily_seasonality=False
            )
            model_prophet.fit(df_prophet)
            
            future = model_prophet.make_future_dataframe(periods=steps, freq='Y')
            forecast_prophet = model_prophet.predict(future)
            
            results['Prophet'] = {
                'forecast': forecast_prophet[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(steps),
                'model': model_prophet
            }
        except Exception as e:
            logger.warning(f"Prophet failed: {str(e)}")
        
        # 4. Simple statistical methods
        # Linear trend projection
        x = np.arange(len(series)).reshape(-1, 1)
        y = series.values
        model_linear = LinearRegression()
        model_linear.fit(x, y)
        
        # Forecast
        x_future = np.arange(len(series), len(series) + steps).reshape(-1, 1)
        forecast_linear = model_linear.predict(x_future)
        
        # Calculate confidence interval
        residuals = y - model_linear.predict(x)
        std_residuals = np.std(residuals)
        ci_lower = forecast_linear - 1.96 * std_residuals
        ci_upper = forecast_linear + 1.96 * std_residuals
        
        results['LinearTrend'] = {
            'forecast': forecast_linear,
            'confidence_interval': np.column_stack([ci_lower, ci_upper]),
            'model': model_linear,
            'r_squared': model_linear.score(x, y)
        }
        
        # 5. Moving average projection
        last_value = series.iloc[-1]
        growth_rate = series.pct_change().mean()
        forecast_ma = [last_value * (1 + growth_rate) ** i for i in range(1, steps + 1)]
        
        results['MovingAverage'] = {
            'forecast': np.array(forecast_ma),
            'growth_rate': growth_rate
        }
        
        # Store all forecasts
        self.forecast_results = results
        
        return results
    
    def create_ensemble_forecast(self, forecasts: Dict[str, Any], method: str = 'weighted_average') -> pd.Series:
        """Create ensemble forecast from multiple models"""
        
        # Extract forecast values from each model
        forecast_values = {}
        
        for model_name, result in forecasts.items():
            if 'forecast' in result:
                if isinstance(result['forecast'], pd.Series):
                    forecast_values[model_name] = result['forecast'].values
                elif isinstance(result['forecast'], np.ndarray):
                    forecast_values[model_name] = result['forecast']
                elif isinstance(result['forecast'], pd.DataFrame) and 'yhat' in result['forecast'].columns:
                    forecast_values[model_name] = result['forecast']['yhat'].values
        
        if not forecast_values:
            logger.warning("No valid forecasts found for ensemble")
            return None
        
        # Create DataFrame of forecasts
        forecast_df = pd.DataFrame(forecast_values)
        
        # Apply ensemble method
        if method == 'simple_average':
            ensemble_forecast = forecast_df.mean(axis=1)
        elif method == 'weighted_average':
            # Weight by inverse of variance (if available)
            weights = {}
            for model_name in forecast_df.columns:
                if model_name in forecasts and 'confidence_interval' in forecasts[model_name]:
                    ci = forecasts[model_name]['confidence_interval']
                    if isinstance(ci, pd.DataFrame):
                        variance = ((ci.iloc[:, 1] - ci.iloc[:, 0]) / 3.92) ** 2
                        weights[model_name] = 1 / variance.mean()
                    elif isinstance(ci, np.ndarray):
                        variance = ((ci[:, 1] - ci[:, 0]) / 3.92) ** 2
                        weights[model_name] = 1 / variance.mean()
                else:
                    weights[model_name] = 1
            
            # Normalize weights
            weight_sum = sum(weights.values())
            for key in weights:
                weights[key] /= weight_sum
            
            # Weighted average
            ensemble_forecast = pd.Series(0.0, index=forecast_df.index)
            for model_name, weight in weights.items():
                if model_name in forecast_df.columns:
                    ensemble_forecast += forecast_df[model_name] * weight
        elif method == 'median':
            ensemble_forecast = forecast_df.median(axis=1)
        else:
            ensemble_forecast = forecast_df.mean(axis=1)
        
        return ensemble_forecast
    
    def predict_population_scenarios(self, df: pd.DataFrame, country: str, years: int = 30) -> Dict[str, pd.DataFrame]:
        """Predict population under different scenarios"""
        logger.info(f"Predicting population scenarios for {country} for {years} years")
        
        # Filter data for the country
        country_data = df[df['country'] == country].copy()
        
        if len(country_data) < 10:
            logger.warning(f"Insufficient data for {country}")
            return {}
        
        # Prepare time series
        country_data = country_data.sort_values('year')
        years_historical = country_data['year'].values
        population_historical = country_data['population'].values
        
        # Create future years
        last_year = years_historical[-1]
        future_years = np.arange(last_year + 1, last_year + years + 1)
        
        # Define scenarios
        scenarios = {
            'business_as_usual': {
                'birth_rate_change': 0,
                'death_rate_change': 0,
                'migration_rate': country_data['migration_rate'].mean() if 'migration_rate' in country_data.columns else 0
            },
            'high_growth': {
                'birth_rate_change': 0.1,  # 10% increase
                'death_rate_change': -0.05,  # 5% decrease
                'migration_rate': country_data['migration_rate'].mean() * 1.5 if 'migration_rate' in country_data.columns else 0.1
            },
            'low_growth': {
                'birth_rate_change': -0.1,  # 10% decrease
                'death_rate_change': 0.05,  # 5% increase
                'migration_rate': country_data['migration_rate'].mean() * 0.5 if 'migration_rate' in country_data.columns else -0.1
            },
            'rapid_aging': {
                'birth_rate_change': -0.2,  # 20% decrease
                'death_rate_change': -0.1,  # 10% decrease (life expectancy increases)
                'migration_rate': 0
            },
            'sustainable_development': {
                'birth_rate_change': -0.05,
                'death_rate_change': -0.1,
                'migration_rate': 0,
                'education_improvement': 0.2,
                'healthcare_improvement': 0.3
            }
        }
        
        scenario_results = {}
        
        for scenario_name, parameters in scenarios.items():
            # Start from last known population
            current_population = population_historical[-1]
            population_projection = [current_population]
            
            # Get baseline rates
            last_birth_rate = country_data['birth_rate'].iloc[-1] if 'birth_rate' in country_data.columns else 15
            last_death_rate = country_data['death_rate'].iloc[-1] if 'death_rate' in country_data.columns else 8
            
            for year in range(1, years + 1):
                # Adjust rates based on scenario
                birth_rate = last_birth_rate * (1 + parameters.get('birth_rate_change', 0))
                death_rate = last_death_rate * (1 + parameters.get('death_rate_change', 0))
                migration_rate = parameters.get('migration_rate', 0)
                
                # Calculate natural increase
                natural_increase = current_population * (birth_rate - death_rate) / 1000
                
                # Calculate net migration
                net_migration = current_population * migration_rate / 1000
                
                # Update population
                current_population += natural_increase + net_migration
                
                # Apply additional factors
                if 'education_improvement' in parameters:
                    # Education reduces fertility
                    birth_rate *= (1 - 0.1 * parameters['education_improvement'])
                
                if 'healthcare_improvement' in parameters:
                    # Healthcare reduces mortality
                    death_rate *= (1 - 0.15 * parameters['healthcare_improvement'])
                
                population_projection.append(current_population)
            
            # Create results DataFrame
            scenario_df = pd.DataFrame({
                'year': np.concatenate([years_historical, future_years]),
                'population': np.concatenate([population_historical, population_projection[1:]]),
                'scenario': scenario_name
            })
            
            scenario_results[scenario_name] = scenario_df
        
        return scenario_results
    
    def calculate_demographic_indicators(self, df: pd.DataFrame, forecast_years: int = 20) -> Dict[str, pd.DataFrame]:
        """Calculate future demographic indicators"""
        logger.info(f"Calculating demographic indicators for {forecast_years} years")
        
        results = {}
        
        # Get unique countries
        countries = df['country'].unique()
        
        for country in countries[:10]:  # Limit to 10 countries for performance
            country_data = df[df['country'] == country].copy()
            
            if len(country_data) < 5:
                continue
            
            # Sort by year
            country_data = country_data.sort_values('year')
            
            # Prepare indicators for forecasting
            indicators = ['birth_rate', 'death_rate', 'life_expectancy', 'fertility_rate', 'median_age']
            available_indicators = [ind for ind in indicators if ind in country_data.columns]
            
            forecast_data = {}
            
            for indicator in available_indicators:
                # Simple linear projection for each indicator
                years = country_data['year'].values
                values = country_data[indicator].values
                
                # Handle NaN values
                mask = ~np.isnan(values)
                if mask.sum() < 2:
                    continue
                
                # Fit linear model
                X = years[mask].reshape(-1, 1)
                y = values[mask]
                model = LinearRegression()
                model.fit(X, y)
                
                # Forecast future values
                last_year = years[-1]
                future_years = np.arange(last_year + 1, last_year + forecast_years + 1).reshape(-1, 1)
                forecast_values = model.predict(future_years)
                
                # Apply reasonable bounds
                if indicator == 'fertility_rate':
                    forecast_values = np.clip(forecast_values, 1.0, 8.0)
                elif indicator == 'life_expectancy':
                    forecast_values = np.clip(forecast_values, 40, 100)
                elif indicator == 'median_age':
                    forecast_values = np.clip(forecast_values, 15, 60)
                
                forecast_data[indicator] = forecast_values
            
            if forecast_data:
                # Create DataFrame
                forecast_years_arr = np.arange(country_data['year'].iloc[-1] + 1, 
                                             country_data['year'].iloc[-1] + forecast_years + 1)
                forecast_df = pd.DataFrame(forecast_data, index=forecast_years_arr)
                forecast_df['country'] = country
                forecast_df['year'] = forecast_df.index
                
                results[country] = forecast_df
        
        return results
    
    def evaluate_model_performance(self, X_test: pd.DataFrame, y_test: pd.Series) -> pd.DataFrame:
        """Evaluate all trained models on test data"""
        logger.info("Evaluating model performance")
        
        performance_data = []
        
        for name, model in self.models.items():
            try:
                # Scale test data
                X_test_scaled = self.scaler.transform(X_test)
                
                # Make predictions
                y_pred = model.predict(X_test_scaled)
                
                # Calculate metrics
                mse = mean_squared_error(y_test, y_pred)
                rmse = np.sqrt(mse)
                mae = mean_absolute_error(y_test, y_pred)
                r2 = r2_score(y_test, y_pred)
                mape = np.mean(np.abs((y_test - y_pred) / y_test.clip(lower=1))) * 100
                
                performance_data.append({
                    'Model': name,
                    'RMSE': rmse,
                    'MAE': mae,
                    'R²': r2,
                    'MAPE': mape,
                    'MSE': mse
                })
                
            except Exception as e:
                logger.warning(f"Error evaluating {name}: {str(e)}")
                continue
        
        performance_df = pd.DataFrame(performance_data)
        
        if not performance_df.empty:
            performance_df = performance_df.sort_values('R²', ascending=False)
            logger.info(f"Model performance ranking:\n{performance_df[['Model', 'R²', 'RMSE']].to_string()}")
        
        return performance_df
    
    def plot_forecast_comparison(self, historical_data: pd.Series, forecasts: Dict[str, Any]) -> None:
        """Plot comparison of different forecasting methods"""
        plt.figure(figsize=(14, 8))
        
        # Plot historical data
        plt.plot(historical_data.index, historical_data.values, 'k-', linewidth=3, label='Historical', alpha=0.8)
        
        # Plot each forecast
        colors = plt.cm.tab10.colors
        for i, (model_name, result) in enumerate(forecasts.items()):
            if 'forecast' in result:
                forecast = result['forecast']
                
                if isinstance(forecast, pd.Series):
                    plt.plot(forecast.index, forecast.values, '--', linewidth=2, 
                            color=colors[i % len(colors)], label=model_name, alpha=0.7)
                elif isinstance(forecast, np.ndarray):
                    # Create index for forecast
                    last_year = historical_data.index[-1]
                    forecast_years = np.arange(last_year + 1, last_year + len(forecast) + 1)
                    plt.plot(forecast_years, forecast, '--', linewidth=2,
                            color=colors[i % len(colors)], label=model_name, alpha=0.7)
                elif isinstance(forecast, pd.DataFrame) and 'yhat' in forecast.columns:
                    plt.plot(forecast['ds'], forecast['yhat'], '--', linewidth=2,
                            color=colors[i % len(colors)], label=model_name, alpha=0.7)
                
                # Add confidence intervals if available
                if 'confidence_interval' in result:
                    ci = result['confidence_interval']
                    if isinstance(ci, pd.DataFrame):
                        plt.fill_between(ci.index, ci.iloc[:, 0], ci.iloc[:, 1],
                                        color=colors[i % len(colors)], alpha=0.1)
                    elif isinstance(ci, np.ndarray):
                        forecast_years = np.arange(last_year + 1, last_year + len(forecast) + 1)
                        plt.fill_between(forecast_years, ci[:, 0], ci[:, 1],
                                        color=colors[i % len(colors)], alpha=0.1)
        
        plt.xlabel('Year')
        plt.ylabel('Population')
        plt.title('Population Forecast Comparison', fontsize=16, fontweight='bold')
        plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        # Save figure
        plt.savefig('output_charts/forecast_comparison.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        logger.info("Forecast comparison plot saved")


# ============================================================================
# STATISTICAL ANALYSIS MODULE
# ============================================================================

class PopulationStatistician:
    """Advanced statistical analysis for population data"""
    
    def __init__(self):
        self.results = {}
        self.hypotheses = {}
        self.confidence_intervals = {}
        
    def perform_comprehensive_analysis(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform comprehensive statistical analysis"""
        logger.info("Performing comprehensive statistical analysis")
        
        analysis_results = {}
        
        # 1. Descriptive Statistics
        analysis_results['descriptive'] = self._calculate_descriptive_statistics(df)
        
        # 2. Correlation Analysis
        analysis_results['correlation'] = self._perform_correlation_analysis(df)
        
        # 3. Regression Analysis
        analysis_results['regression'] = self._perform_regression_analysis(df)
        
        # 4. Time Series Analysis
        analysis_results['time_series'] = self._perform_time_series_analysis(df)
        
        # 5. Cluster Analysis
        analysis_results['clustering'] = self._perform_cluster_analysis(df)
        
        # 6. Hypothesis Testing
        analysis_results['hypothesis_tests'] = self._perform_hypothesis_tests(df)
        
        # 7. ANOVA and Group Comparisons
        analysis_results['anova'] = self._perform_anova_analysis(df)
        
        # 8. Principal Component Analysis
        analysis_results['pca'] = self._perform_pca_analysis(df)
        
        # 9. Spatial Statistics (if geographic data available)
        if 'latitude' in df.columns and 'longitude' in df.columns:
            analysis_results['spatial'] = self._perform_spatial_analysis(df)
        
        # 10. Demographic Model Fitting
        analysis_results['demographic_models'] = self._fit_demographic_models(df)
        
        logger.info("Comprehensive statistical analysis completed")
        return analysis_results
    
    def _calculate_descriptive_statistics(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Calculate comprehensive descriptive statistics"""
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        
        stats = {}
        for col in numeric_cols:
            col_data = df[col].dropna()
            
            if len(col_data) > 0:
                stats[col] = {
                    'count': len(col_data),
                    'mean': col_data.mean(),
                    'median': col_data.median(),
                    'std': col_data.std(),
                    'min': col_data.min(),
                    'max': col_data.max(),
                    'range': col_data.max() - col_data.min(),
                    'q1': col_data.quantile(0.25),
                    'q3': col_data.quantile(0.75),
                    'iqr': col_data.quantile(0.75) - col_data.quantile(0.25),
                    'skewness': col_data.skew(),
                    'kurtosis': col_data.kurtosis(),
                    'cv': (col_data.std() / col_data.mean()) * 100 if col_data.mean() != 0 else np.nan,
                    'mad': np.mean(np.abs(col_data - col_data.mean())),  # Mean Absolute Deviation
                    'non_null': col_data.count(),
                    'null_count': df[col].isnull().sum(),
                    'null_percentage': (df[col].isnull().sum() / len(df)) * 100
                }
        
        # Overall dataset statistics
        stats['dataset'] = {
            'total_rows': len(df),
            'total_columns': len(df.columns),
            'numeric_columns': len(numeric_cols),
            'categorical_columns': len(df.columns) - len(numeric_cols),
            'total_missing_values': df.isnull().sum().sum(),
            'missing_percentage': (df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100
        }
        
        return stats
    
    def _perform_correlation_analysis(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform correlation analysis between variables"""
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        
        # Limit to reasonable number of columns
        if len(numeric_cols) > 20:
            # Select columns with highest variance
            variances = df[numeric_cols].var()
            selected_cols = variances.nlargest(20).index
        else:
            selected_cols = numeric_cols
        
        # Calculate correlation matrices
        pearson_corr = df[selected_cols].corr(method='pearson')
        spearman_corr = df[selected_cols].corr(method='spearman')
        
        # Find strongest correlations
        n_vars = len(selected_cols)
        strong_correlations = []
        
        for i in range(n_vars):
            for j in range(i + 1, n_vars):
                pearson_val = pearson_corr.iloc[i, j]
                spearman_val = spearman_corr.iloc[i, j]
                
                if abs(pearson_val) > 0.7 or abs(spearman_val) > 0.7:
                    strong_correlations.append({
                        'var1': selected_cols[i],
                        'var2': selected_cols[j],
                        'pearson': pearson_val,
                        'spearman': spearman_val,
                        'strength': 'strong' if abs(pearson_val) > 0.8 else 'moderate'
                    })
        
        # Calculate partial correlations for top variables
        partial_correlations = {}
        if len(selected_cols) >= 3:
            # Simple implementation - for production use pingouin or similar
            pass
        
        return {
            'pearson_matrix': pearson_corr,
            'spearman_matrix': spearman_corr,
            'strong_correlations': strong_correlations,
            'partial_correlations': partial_correlations
        }
    
    def _perform_regression_analysis(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform multiple regression analyses"""
        
        # Select key demographic variables
        target_vars = ['population_growth_pct', 'life_expectancy', 'fertility_rate']
        available_targets = [var for var in target_vars if var in df.columns]
        
        regression_results = {}
        
        for target in available_targets[:3]:  # Limit to 3 targets
            # Select predictor variables
            potential_predictors = ['gdp_per_capita', 'urbanization_rate', 'education_index',
                                  'healthcare_index', 'birth_rate', 'death_rate']
            predictors = [p for p in potential_predictors if p in df.columns and p != target]
            
            if len(predictors) < 2:
                continue
            
            # Prepare data
            regression_data = df[[target] + predictors].dropna()
            
            if len(regression_data) < 10:
                continue
            
            # Multiple linear regression
            X = regression_data[predictors]
            y = regression_data[target]
            
            # Add constant for intercept
            X = sm.add_constant(X)
            
            try:
                model = sm.OLS(y, X).fit()
                
                regression_results[target] = {
                    'model_summary': str(model.summary()),
                    'rsquared': model.rsquared,
                    'rsquared_adj': model.rsquared_adj,
                    'f_statistic': model.fvalue,
                    'f_pvalue': model.f_pvalue,
                    'coefficients': model.params.to_dict(),
                    'pvalues': model.pvalues.to_dict(),
                    'conf_int': model.conf_int().to_dict(),
                    'aic': model.aic,
                    'bic': model.bic,
                    'residuals_mean': model.resid.mean(),
                    'residuals_std': model.resid.std(),
                    'jarque_bera': model.jarque_bera,
                    'dw_statistic': model.durbin_watson,
                    'condition_number': model.condition_number
                }
                
                # Check for multicollinearity using VIF
                from statsmodels.stats.outliers_influence import variance_inflation_factor
                vif_data = pd.DataFrame()
                vif_data["Variable"] = X.columns
                vif_data["VIF"] = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
                regression_results[target]['vif'] = vif_data.to_dict('records')
                
            except Exception as e:
                logger.warning(f"Regression failed for {target}: {str(e)}")
                continue
        
        return regression_results
    
    def _perform_time_series_analysis(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform time series analysis"""
        
        # Group by country for panel data analysis
        if 'country' in df.columns and 'year' in df.columns:
            countries = df['country'].unique()[:5]  # Limit to 5 countries
            
            time_series_results = {}
            
            for country in countries:
                country_data = df[df['country'] == country].sort_values('year')
                
                if len(country_data) < 10:
                    continue
                
                # Analyze population time series
                population_series = country_data.set_index('year')['population']
                
                # Stationarity tests
                from statsmodels.tsa.stattools import adfuller, kpss
                
                # ADF test
                adf_result = adfuller(population_series.dropna())
                
                # KPSS test
                try:
                    kpss_result = kpss(population_series.dropna(), regression='c')
                except:
                    kpss_result = (np.nan, np.nan, np.nan, {})
                
                # Autocorrelation analysis
                nlags = min(20, len(population_series) // 2 - 1)
                from statsmodels.tsa.stattools import acf, pacf
                autocorr = acf(population_series, nlags=nlags)
                partial_autocorr = pacf(population_series, nlags=nlags)
                
                time_series_results[country] = {
                    'adf_test': {
                        'statistic': adf_result[0],
                        'pvalue': adf_result[1],
                        'critical_values': adf_result[4],
                        'stationary': adf_result[1] < 0.05
                    },
                    'kpss_test': {
                        'statistic': kpss_result[0],
                        'pvalue': kpss_result[1],
                        'critical_values': kpss_result[3],
                        'stationary': kpss_result[1] > 0.05
                    },
                    'autocorrelation': autocorr.tolist(),
                    'partial_autocorrelation': partial_autocorr.tolist(),
                    'growth_rates': population_series.pct_change().describe().to_dict(),
                    'volatility': population_series.pct_change().std()
                }
            
            return time_series_results
        
        return {}
    
    def _perform_cluster_analysis(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform cluster analysis to identify country groups"""
        
        # Use latest year data
        if 'year' in df.columns:
            latest_year = df['year'].max()
            latest_data = df[df['year'] == latest_year].copy()
        else:
            latest_data = df.copy()
        
        # Select clustering variables
        cluster_vars = ['population', 'gdp_per_capita', 'life_expectancy', 
                       'urbanization_rate', 'growth_rate', 'fertility_rate']
        available_vars = [var for var in cluster_vars if var in latest_data.columns]
        
        if len(available_vars) < 3:
            return {}
        
        # Prepare data
        cluster_data = latest_data[available_vars + ['country']].dropna()
        
        if len(cluster_data) < 10:
            return {}
        
        # Scale features
        from sklearn.preprocessing import StandardScaler
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(cluster_data[available_vars])
        
        # Determine optimal number of clusters using elbow method
        wcss = []  # Within-cluster sum of squares
        max_clusters = min(10, len(cluster_data) - 1)
        
        for i in range(2, max_clusters + 1):
            kmeans = KMeans(n_clusters=i, random_state=42, n_init=10)
            kmeans.fit(X_scaled)
            wcss.append(kmeans.inertia_)
        
        # Calculate elbow point (simplified)
        if len(wcss) >= 2:
            # Calculate second derivative approximation
            differences = np.diff(wcss)
            second_diff = np.diff(differences)
            
            if len(second_diff) > 0:
                # Elbow is where second derivative is maximum (most negative)
                elbow_point = np.argmin(second_diff) + 3  # +3 because we started at 2 clusters
                optimal_clusters = min(max(2, elbow_point), max_clusters)
            else:
                optimal_clusters = 3
        else:
            optimal_clusters = 3
        
        # Perform clustering with optimal number
        kmeans = KMeans(n_clusters=optimal_clusters, random_state=42, n_init=10)
        cluster_labels = kmeans.fit_predict(X_scaled)
        
        # Add cluster labels to data
        cluster_data = cluster_data.copy()
        cluster_data['cluster'] = cluster_labels
        
        # Calculate cluster statistics
        cluster_stats = {}
        for cluster_num in range(optimal_clusters):
            cluster_points = cluster_data[cluster_data['cluster'] == cluster_num]
            cluster_stats[cluster_num] = {
                'size': len(cluster_points),
                'countries': cluster_points['country'].tolist(),
                'centroid': kmeans.cluster_centers_[cluster_num].tolist(),
                'characteristics': cluster_points[available_vars].mean().to_dict()
            }
        
        # Perform PCA for visualization
        pca = PCA(n_components=2)
        X_pca = pca.fit_transform(X_scaled)
        
        return {
            'optimal_clusters': optimal_clusters,
            'wcss': wcss,
            'cluster_assignments': cluster_data[['country', 'cluster']].to_dict('records'),
            'cluster_statistics': cluster_stats,
            'pca_components': pca.components_.tolist(),
            'pca_explained_variance': pca.explained_variance_ratio_.tolist(),
            'pca_transformed': X_pca.tolist()
        }
    
    def _perform_hypothesis_tests(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform statistical hypothesis tests"""
        
        tests = {}
        
        # Test 1: Difference in growth rates between developed and developing countries
        if 'growth_rate' in df.columns and 'gdp_per_capita' in df.columns:
            latest_year = df['year'].max()
            latest_data = df[df['year'] == latest_year].copy()
            
            # Define developed vs developing (simplified)
            median_gdp = latest_data['gdp_per_capita'].median()
            developed = latest_data[latest_data['gdp_per_capita'] > median_gdp]['growth_rate'].dropna()
            developing = latest_data[latest_data['gdp_per_capita'] <= median_gdp]['growth_rate'].dropna()
            
            if len(developed) > 5 and len(developing) > 5:
                # t-test for independent samples
                t_stat, p_value = stats.ttest_ind(developed, developing, equal_var=False)
                tests['growth_rate_developed_vs_developing'] = {
                    'test': 'Welch\'s t-test',
                    'statistic': t_stat,
                    'pvalue': p_value,
                    'significant': p_value < 0.05,
                    'developed_mean': developed.mean(),
                    'developing_mean': developing.mean(),
                    'developed_std': developed.std(),
                    'developing_std': developing.std(),
                    'n_developed': len(developed),
                    'n_developing': len(developing)
                }
        
        # Test 2: Correlation between education and fertility
        if 'education_index' in df.columns and 'fertility_rate' in df.columns:
            latest_year = df['year'].max()
            latest_data = df[df['year'] == latest_year].copy()
            
            corr_coef, p_value = pearsonr(latest_data['education_index'].dropna(), 
                                         latest_data['fertility_rate'].dropna())
            tests['education_fertility_correlation'] = {
                'test': 'Pearson correlation',
                'correlation': corr_coef,
                'pvalue': p_value,
                'significant': p_value < 0.05,
                'n': len(latest_data.dropna(subset=['education_index', 'fertility_rate']))
            }
        
        # Test 3: Urbanization trend over time
        if 'urbanization_rate' in df.columns and 'year' in df.columns:
            # Test for increasing trend using Mann-Kendall
            from scipy.stats import kendalltau
            
            # Average urbanization by year
            urban_by_year = df.groupby('year')['urbanization_rate'].mean()
            
            tau, p_value = kendalltau(urban_by_year.index, urban_by_year.values)
            tests['urbanization_trend'] = {
                'test': 'Mann-Kendall trend test',
                'tau': tau,
                'pvalue': p_value,
                'significant': p_value < 0.05,
                'trend': 'increasing' if tau > 0 else 'decreasing',
                'years': len(urban_by_year)
            }
        
        # Test 4: Normality tests for key variables
        normality_tests = {}
        for var in ['population_growth_pct', 'life_expectancy', 'gdp_per_capita']:
            if var in df.columns:
                data = df[var].dropna()
                if len(data) > 3:
                    # Shapiro-Wilk test (for smaller samples)
                    if len(data) < 5000:
                        stat, p_value = stats.shapiro(data)
                        test_name = 'Shapiro-Wilk'
                    else:
                        # Kolmogorov-Smirnov test for larger samples
                        stat, p_value = stats.kstest(data, 'norm', 
                                                    args=(data.mean(), data.std()))
                        test_name = 'Kolmogorov-Smirnov'
                    
                    normality_tests[var] = {
                        'test': test_name,
                        'statistic': stat,
                        'pvalue': p_value,
                        'normal': p_value > 0.05
                    }
        
        tests['normality'] = normality_tests
        
        return tests
    
    def _perform_anova_analysis(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform ANOVA and post-hoc tests"""
        
        anova_results = {}
        
        # Example: Compare population growth across regions
        if 'growth_rate' in df.columns and 'region' in df.columns:
            latest_year = df['year'].max()
            latest_data = df[df['year'] == latest_year].copy()
            
            # Get regions with sufficient data
            region_counts = latest_data['region'].value_counts()
            valid_regions = region_counts[region_counts >= 5].index.tolist()
            
            if len(valid_regions) >= 2:
                # Prepare data for ANOVA
                groups = [latest_data[latest_data['region'] == region]['growth_rate'].dropna().values 
                         for region in valid_regions]
                
                # One-way ANOVA
                f_stat, p_value = stats.f_oneway(*groups)
                
                anova_results['growth_rate_by_region'] = {
                    'test': 'One-way ANOVA',
                    'f_statistic': f_stat,
                    'pvalue': p_value,
                    'significant': p_value < 0.05,
                    'group_means': {region: latest_data[latest_data['region'] == region]['growth_rate'].mean() 
                                   for region in valid_regions},
                    'group_stds': {region: latest_data[latest_data['region'] == region]['growth_rate'].std() 
                                  for region in valid_regions},
                    'group_counts': {region: len(latest_data[latest_data['region'] == region]['growth_rate'].dropna()) 
                                    for region in valid_regions}
                }
                
                # Post-hoc tests if ANOVA is significant
                if p_value < 0.05 and len(valid_regions) > 2:
                    from statsmodels.stats.multicomp import pairwise_tukeyhsd
                    
                    # Prepare data for Tukey HSD
                    tukey_data = []
                    tukey_labels = []
                    for i, region in enumerate(valid_regions):
                        region_data = latest_data[latest_data['region'] == region]['growth_rate'].dropna()
                        tukey_data.extend(region_data)
                        tukey_labels.extend([region] * len(region_data))
                    
                    tukey_result = pairwise_tukeyhsd(tukey_data, tukey_labels, alpha=0.05)
                    
                    anova_results['growth_rate_by_region']['posthoc_tukey'] = {
                        'summary': str(tukey_result.summary()),
                        'reject': tukey_result.reject.tolist(),
                        'pvalues': tukey_result.pvalues.tolist(),
                        'conf_int': tukey_result.confint.tolist()
                    }
        
        return anova_results
    
    def _perform_pca_analysis(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform Principal Component Analysis"""
        
        # Use latest year data
        if 'year' in df.columns:
            latest_year = df['year'].max()
            latest_data = df[df['year'] == latest_year].copy()
        else:
            latest_data = df.copy()
        
        # Select variables for PCA
        pca_vars = ['population', 'gdp_per_capita', 'life_expectancy', 
                   'urbanization_rate', 'growth_rate', 'fertility_rate',
                   'birth_rate', 'death_rate', 'education_index']
        available_vars = [var for var in pca_vars if var in latest_data.columns]
        
        if len(available_vars) < 3:
            return {}
        
        # Prepare data
        pca_data = latest_data[available_vars + ['country']].dropna()
        
        if len(pca_data) < 10:
            return {}
        
        # Scale features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(pca_data[available_vars])
        
        # Perform PCA
        pca = PCA()
        X_pca = pca.fit_transform(X_scaled)
        
        # Calculate cumulative explained variance
        cumsum_variance = np.cumsum(pca.explained_variance_ratio_)
        
        # Determine number of components to explain 95% variance
        n_components_95 = np.argmax(cumsum_variance >= 0.95) + 1
        
        # Get component loadings
        loadings = pd.DataFrame(
            pca.components_.T,
            columns=[f'PC{i+1}' for i in range(pca.n_components_)],
            index=available_vars
        )
        
        # Create biplot data
        pca_results = pd.DataFrame(
            X_pca[:, :2],
            columns=['PC1', 'PC2'],
            index=pca_data.index
        )
        pca_results['country'] = pca_data['country'].values
        
        return {
            'explained_variance_ratio': pca.explained_variance_ratio_.tolist(),
            'cumulative_variance': cumsum_variance.tolist(),
            'n_components_95': n_components_95,
            'components': loadings.to_dict(),
            'pca_scores': pca_results.to_dict('records'),
            'singular_values': pca.singular_values_.tolist(),
            'mean': scaler.mean_.tolist(),
            'scale': scaler.scale_.tolist()
        }
    
    def _perform_spatial_analysis(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform spatial statistical analysis"""
        
        spatial_results = {}
        
        if 'latitude' in df.columns and 'longitude' in df.columns:
            # Check for spatial autocorrelation using Moran's I (simplified)
            from libpysal.weights import DistanceBand
            from esda.moran import Moran
            
            # Create spatial weights matrix
            coords = list(zip(df['longitude'], df['latitude']))
            
            try:
                # Create distance-based weights
                w = DistanceBand(coords, threshold=1000, binary=False)  # 1000 km threshold
                
                # Calculate Moran's I for population density if available
                if 'population_density' in df.columns:
                    mi = Moran(df['population_density'].values, w)
                    
                    spatial_results['morans_i'] = {
                        'statistic': mi.I,
                        'expected': mi.EI,
                        'variance': mi.VI,
                        'z_score': mi.z_norm,
                        'pvalue': mi.p_norm,
                        'significant': mi.p_norm < 0.05
                    }
                
                # Calculate spatial lag
                spatial_results['weights_matrix'] = {
                    'n': w.n,
                    'density': w.asymmetry().sum() / (w.n * w.n),
                    'islands': len(w.islands)
                }
                
            except Exception as e:
                logger.warning(f"Spatial analysis failed: {str(e)}")
                spatial_results['error'] = str(e)
        
        return spatial_results
    
    def _fit_demographic_models(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Fit demographic models to population data"""
        
        demographic_models = {}
        
        # Logistic growth model fitting
        if 'year' in df.columns and 'population' in df.columns:
            countries = df['country'].unique()[:5]  # Limit to 5 countries
            
            for country in countries:
                country_data = df[df['country'] == country].sort_values('year')
                
                if len(country_data) < 10:
                    continue
                
                # Prepare data
                years = country_data['year'].values
                population = country_data['population'].values
                
                # Define logistic growth function
                def logistic_growth(t, K, r, P0):
                    """Logistic growth model: P(t) = K / (1 + ((K - P0)/P0) * exp(-r*t))"""
                    return K / (1 + ((K - P0) / P0) * np.exp(-r * (t - years[0])))
                
                try:
                    # Initial parameter guesses
                    K_guess = population[-1] * 1.5  # Carrying capacity
                    r_guess = 0.02  # Growth rate
                    P0_guess = population[0]  # Initial population
                    
                    # Fit model
                    popt, pcov = curve_fit(logistic_growth, years, population, 
                                          p0=[K_guess, r_guess, P0_guess],
                                          maxfev=5000)
                    
                    # Calculate predictions
                    predictions = logistic_growth(years, *popt)
                    
                    # Calculate goodness of fit
                    residuals = population - predictions
                    ss_res = np.sum(residuals**2)
                    ss_tot = np.sum((population - np.mean(population))**2)
                    r_squared = 1 - (ss_res / ss_tot)
                    
                    # Parameter confidence intervals
                    perr = np.sqrt(np.diag(pcov))
                    
                    demographic_models[country] = {
                        'model': 'logistic_growth',
                        'parameters': {
                            'K': popt[0],  # Carrying capacity
                            'r': popt[1],  # Growth rate
                            'P0': popt[2]  # Initial population
                        },
                        'parameter_errors': perr.tolist(),
                        'r_squared': r_squared,
                        'predictions': predictions.tolist(),
                        'residuals': residuals.tolist(),
                        'rmse': np.sqrt(mean_squared_error(population, predictions))
                    }
                    
                except Exception as e:
                    logger.warning(f"Logistic model failed for {country}: {str(e)}")
                    continue
        
        # Exponential growth model comparison
        if demographic_models:
            # Compare with exponential model for each country
            for country in list(demographic_models.keys()):
                country_data = df[df['country'] == country].sort_values('year')
                years = country_data['year'].values
                population = country_data['population'].values
                
                # Exponential model: P(t) = P0 * exp(r*t)
                log_pop = np.log(population)
                coeffs = np.polyfit(years - years[0], log_pop, 1)
                r_exp = coeffs[0]
                P0_exp = np.exp(coeffs[1])
                
                exp_predictions = P0_exp * np.exp(r_exp * (years - years[0]))
                exp_r2 = r2_score(population, exp_predictions)
                
                demographic_models[country]['exponential_comparison'] = {
                    'growth_rate': r_exp,
                    'initial_population': P0_exp,
                    'r_squared': exp_r2,
                    'predictions': exp_predictions.tolist()
                }
        
        return demographic_models


# ============================================================================
# MAIN APPLICATION AND EXPORT MODULE
# ============================================================================

class PopulationAnalyticsSystem:
    """Main population analytics system integrating all modules"""
    
    def __init__(self):
        self.data_generator = PopulationDataGenerator()
        self.data_processor = PopulationDataProcessor()
        self.visualizer = PopulationVisualizer()
        self.predictor = PopulationPredictor()
        self.statistician = PopulationStatistician()
        self.data = {}
        self.results = {}
        self.config = self._load_configuration()
        
    def _load_configuration(self) -> Dict[str, Any]:
        """Load system configuration"""
        config = {
            'data_generation': {
                'start_year': 1950,
                'end_year': 2100,
                'n_countries': 20
            },
            'analysis': {
                'test_size': 0.2,
                'forecast_horizon': 30,
                'confidence_level': 0.95
            },
            'visualization': {
                'style': 'darkgrid',
                'dpi': 300,
                'format': 'png'
            },
            'export': {
                'save_data': True,
                'save_plots': True,
                'generate_report': True
            }
        }
        return config
    
    def run_complete_analysis(self, generate_new_data: bool = True) -> None:
        """Run complete population analytics pipeline"""
        logger.info("=" * 80)
        logger.info("STARTING COMPLETE POPULATION ANALYTICS PIPELINE")
        logger.info("=" * 80)
        
        # Step 1: Generate or load data
        if generate_new_data:
            self._generate_all_datasets()
        else:
            self._load_existing_datasets()
        
        # Step 2: Preprocess data
        self._preprocess_all_data()
        
        # Step 3: Perform statistical analysis
        self._perform_all_analyses()
        
        # Step 4: Create visualizations
        self._create_all_visualizations()
        
        # Step 5: Generate forecasts
        self._generate_all_forecasts()
        
        # Step 6: Export results
        self._export_all_results()
        
        logger.info("=" * 80)
        logger.info("ANALYTICS PIPELINE COMPLETED SUCCESSFULLY")
        logger.info("=" * 80)
    
    def _generate_all_datasets(self) -> None:
        """Generate all required datasets"""
        logger.info("Generating all population datasets...")
        
        # 1. World population dataset
        self.data['world'] = self.data_generator.generate_world_population_dataset(
            start_year=self.config['data_generation']['start_year'],
            end_year=self.config['data_generation']['end_year']
        )
        
        # 2. Age structure data for selected countries
        self.data['age_structures'] = {}
        countries = ['China', 'India', 'United States', 'Japan', 'Germany']
        for country in countries:
            self.data['age_structures'][country] = self.data_generator.generate_age_structure_data(
                country, 2020
            )
        
        # 3. Geographic distribution data
        self.data['geographic'] = self.data_generator.generate_geographic_distribution_data()
        
        # 4. Migration flows
        self.data['migration'] = self.data_generator.generate_migration_flows()
        
        # 5. Historical timelines
        self.data['historical'] = {}
        for country in ['China', 'United States', 'India']:
            self.data['historical'][country] = self.data_generator.generate_historical_population_timeline(country)
        
        logger.info("All datasets generated successfully")
    
    def _load_existing_datasets(self) -> None:
        """Load existing datasets from files"""
        logger.info("Loading existing datasets...")
        
        data_files = {
            'world': 'output_data/world_population_data.csv',
            'geographic': 'output_data/geographic_data.geojson',
            'migration': 'output_data/migration_flows.csv'
        }
        
        for name, filepath in data_files.items():
            if os.path.exists(filepath):
                try:
                    if filepath.endswith('.csv'):
                        self.data[name] = pd.read_csv(filepath)
                    elif filepath.endswith('.geojson'):
                        self.data[name] = gpd.read_file(filepath)
                    logger.info(f"Loaded {name} from {filepath}")
                except Exception as e:
                    logger.error(f"Error loading {name}: {str(e)}")
                    self.data[name] = None
            else:
                logger.warning(f"File not found: {filepath}")
                self.data[name] = None
    
    def _preprocess_all_data(self) -> None:
        """Preprocess all datasets"""
        logger.info("Preprocessing all datasets...")
        
        if 'world' in self.data and self.data['world'] is not None:
            self.data['world_processed'] = self.data_processor.preprocess_world_data(self.data['world'])
            logger.info(f"World data processed: {self.data['world_processed'].shape}")
        
        # Process other datasets as needed
        for name, dataset in self.data.items():
            if dataset is not None and isinstance(dataset, pd.DataFrame):
                # Basic preprocessing for other datasets
                if name not in ['world_processed']:
                    # Handle missing values
                    numeric_cols = dataset.select_dtypes(include=[np.number]).columns
                    for col in numeric_cols:
                        dataset[col] = dataset[col].fillna(dataset[col].median())
    
    def _perform_all_analyses(self) -> None:
        """Perform all statistical analyses"""
        logger.info("Performing statistical analyses...")
        
        if 'world_processed' in self.data:
            # Comprehensive statistical analysis
            self.results['statistical_analysis'] = self.statistician.perform_comprehensive_analysis(
                self.data['world_processed']
            )
            
            # Prepare data for predictive modeling
            X, y = self.data_processor.prepare_training_data(
                self.data['world_processed'],
                target='pop_growth_5yr'
            )
            
            if X is not None and y is not None:
                # Train predictive models
                self.results['predictive_models'] = self.predictor.train_ensemble_models(X, y)
                
                # Evaluate model performance
                self.results['model_evaluation'] = self.predictor.evaluate_model_performance(X, y)
        
        logger.info("All analyses completed")
    
    def _create_all_visualizations(self) -> None:
        """Create all visualizations"""
        logger.info("Creating visualizations...")
        
        if 'world' in self.data:
            # 1. Comprehensive dashboards for key countries
            key_countries = ['China', 'India', 'United States', 'Japan', 'Germany']
            
            for country in key_countries:
                self.visualizer.create_comprehensive_dashboard(self.data['world'], country)
            
            # 2. Global dashboard
            self.visualizer.create_comprehensive_dashboard(self.data['world'])
            
            # 3. Interactive visualizations
            self.visualizer.create_interactive_visualizations(self.data['world'])
            
            # 4. Specialized charts
            self.visualizer.create_specialized_charts(self.data['world'])
        
        logger.info("All visualizations created")
    
    def _generate_all_forecasts(self) -> None:
        """Generate population forecasts"""
        logger.info("Generating population forecasts...")
        
        if 'world' in self.data:
            key_countries = ['China', 'India', 'United States']
            
            self.results['forecasts'] = {}
            
            for country in key_countries:
                country_data = self.data['world'][self.data['world']['country'] == country]
                
                if len(country_data) > 10:
                    # Prepare time series
                    country_data = country_data.sort_values('year')
                    population_series = pd.Series(
                        country_data['population'].values,
                        index=country_data['year'].values
                    )
                    
                    # Time series forecasting
                    ts_forecasts = self.predictor.perform_time_series_forecasting(
                        population_series,
                        steps=20
                    )
                    
                    # Scenario projections
                    scenarios = self.predictor.predict_population_scenarios(
                        self.data['world'],
                        country,
                        years=30
                    )
                    
                    # Demographic indicators forecast
                    demographic_forecast = self.predictor.calculate_demographic_indicators(
                        self.data['world'],
                        forecast_years=20
                    )
                    
                    self.results['forecasts'][country] = {
                        'time_series': ts_forecasts,
                        'scenarios': scenarios,
                        'demographic_indicators': demographic_forecast.get(country, {})
                    }
                    
                    # Plot forecast comparison
                    if ts_forecasts:
                        self.predictor.plot_forecast_comparison(population_series, ts_forecasts)
        
        logger.info("All forecasts generated")
    
    def _export_all_results(self) -> None:
        """Export all results to files"""
        logger.info("Exporting results...")
        
        # 1. Export data
        if self.config['export']['save_data']:
            self._export_datasets()
        
        # 2. Export analysis results
        self._export_analysis_results()
        
        # 3. Generate report
        if self.config['export']['generate_report']:
            self._generate_comprehensive_report()
        
        logger.info("All results exported successfully")
    
    def _export_datasets(self) -> None:
        """Export datasets to files"""
        for name, dataset in self.data.items():
            if isinstance(dataset, pd.DataFrame) and len(dataset) > 0:
                filename = f"output_data/{name}.csv"
                dataset.to_csv(filename, index=False)
                logger.info(f"Exported {name} to {filename}")
            elif isinstance(dataset, gpd.GeoDataFrame):
                filename = f"output_data/{name}.geojson"
                dataset.to_file(filename, driver='GeoJSON')
                logger.info(f"Exported {name} to {filename}")
    
    def _export_analysis_results(self) -> None:
        """Export analysis results"""
        # Export statistical results
        if 'statistical_analysis' in self.results:
            with open('output_data/statistical_analysis.json', 'w') as f:
                # Convert numpy arrays to lists for JSON serialization
                import json
                from json import JSONEncoder
                
                class NumpyEncoder(JSONEncoder):
                    def default(self, obj):
                        if isinstance(obj, np.ndarray):
                            return obj.tolist()
                        if isinstance(obj, np.integer):
                            return int(obj)
                        if isinstance(obj, np.floating):
                            return float(obj)
                        return super().default(obj)
                
                json.dump(self.results['statistical_analysis'], f, cls=NumpyEncoder, indent=2)
        
        # Export model results
        if 'predictive_models' in self.results:
            # Save best model
            best_model = self.predictor.best_models.get('regression', {}).get('model')
            if best_model is not None:
                with open('models/best_population_model.pkl', 'wb') as f:
                    pickle.dump(best_model, f)
        
        # Export forecasts
        if 'forecasts' in self.results:
            with open('output_data/population_forecasts.json', 'w') as f:
                # Simplified export - in production, handle complex objects properly
                import json
                simplified_forecasts = {}
                for country, forecasts in self.results['forecasts'].items():
                    simplified_forecasts[country] = {
                        'scenarios': list(forecasts.get('scenarios', {}).keys())
                    }
                json.dump(simplified_forecasts, f, indent=2)
    
    def _generate_comprehensive_report(self) -> None:
        """Generate comprehensive analysis report"""
        logger.info("Generating comprehensive report...")
        
        report_content = []
        report_content.append("=" * 80)
        report_content.append("POPULATION ANALYTICS COMPREHENSIVE REPORT")
        report_content.append("=" * 80)
        report_content.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report_content.append("")
        
        # 1. Dataset Summary
        report_content.append("1. DATASET SUMMARY")
        report_content.append("-" * 40)
        for name, dataset in self.data.items():
            if isinstance(dataset, pd.DataFrame):
                report_content.append(f"{name}: {len(dataset)} rows, {len(dataset.columns)} columns")
            elif isinstance(dataset, gpd.GeoDataFrame):
                report_content.append(f"{name}: {len(dataset)} features")
        report_content.append("")
        
        # 2. Key Findings
        report_content.append("2. KEY FINDINGS")
        report_content.append("-" * 40)
        
        if 'world' in self.data:
            latest_year = self.data['world']['year'].max()
            latest_data = self.data['world'][self.data['world']['year'] == latest_year]
            
            # Total population
            total_pop = latest_data['population'].sum()
            report_content.append(f"Total Population ({latest_year}): {total_pop:,.0f}")
            
            # Average growth rate
            avg_growth = latest_data['growth_rate'].mean()
            report_content.append(f"Average Growth Rate: {avg_growth:.2f}%")
            
            # Most populous countries
            top_countries = latest_data.nlargest(5, 'population')[['country', 'population']]
            report_content.append("Top 5 Most Populous Countries:")
            for _, row in top_countries.iterrows():
                report_content.append(f"  {row['country']}: {row['population']:,.0f}")
        report_content.append("")
        
        # 3. Model Performance
        report_content.append("3. PREDICTIVE MODEL PERFORMANCE")
        report_content.append("-" * 40)
        
        if 'model_evaluation' in self.results and isinstance(self.results['model_evaluation'], pd.DataFrame):
            if not self.results['model_evaluation'].empty:
                best_model = self.results['model_evaluation'].iloc[0]
                report_content.append(f"Best Model: {best_model['Model']}")
                report_content.append(f"  R² Score: {best_model['R²']:.4f}")
                report_content.append(f"  RMSE: {best_model['RMSE']:.4f}")
        report_content.append("")
        
        # 4. Forecast Summary
        report_content.append("4. POPULATION FORECAST SUMMARY")
        report_content.append("-" * 40)
        
        if 'forecasts' in self.results:
            for country in ['China', 'India', 'United States']:
                if country in self.results['forecasts']:
                    report_content.append(f"{country}: Forecasts generated for 20-30 years")
        report_content.append("")
        
        # 5. Recommendations
        report_content.append("5. POLICY RECOMMENDATIONS")
        report_content.append("-" * 40)
        report_content.append("Based on the analysis, the following recommendations are proposed:")
        report_content.append("1. Countries with aging populations should consider policies to")
        report_content.append("   support fertility and attract working-age migrants.")
        report_content.append("2. Rapidly growing populations require investments in education,")
        report_content.append("   healthcare, and infrastructure.")
        report_content.append("3. Sustainable development requires balancing population growth")
        report_content.append("   with environmental constraints.")
        report_content.append("")
        
        report_content.append("=" * 80)
        report_content.append("END OF REPORT")
        report_content.append("=" * 80)
        
        # Write report to file
        report_text = "\n".join(report_content)
        with open('reports/population_analytics_report.txt', 'w') as f:
            f.write(report_text)
        
        logger.info(f"Report saved to reports/population_analytics_report.txt")
    
    def run_specific_analysis(self, analysis_type: str, **kwargs) -> Any:
        """Run a specific type of analysis"""
        
        if analysis_type == 'country_dashboard':
            country = kwargs.get('country', 'China')
            if 'world' in self.data:
                self.visualizer.create_comprehensive_dashboard(self.data['world'], country)
        
        elif analysis_type == 'forecast':
            country = kwargs.get('country', 'China')
            if 'world' in self.data:
                country_data = self.data['world'][self.data['world']['country'] == country]
                if len(country_data) > 10:
                    population_series = pd.Series(
                        country_data['population'].values,
                        index=country_data['year'].values
                    )
                    forecasts = self.predictor.perform_time_series_forecasting(
                        population_series,
                        steps=kwargs.get('steps', 20)
                    )
                    return forecasts
        
        elif analysis_type == 'correlation':
            if 'world' in self.data:
                correlation_results = self.statistician._perform_correlation_analysis(
                    self.data['world']
                )
                return correlation_results
        
        elif analysis_type == 'cluster':
            if 'world' in self.data:
                cluster_results = self.statistician._perform_cluster_analysis(
                    self.data['world']
                )
                return cluster_results
        
        else:
            logger.warning(f"Unknown analysis type: {analysis_type}")
            return None


# ============================================================================
# COMMAND-LINE INTERFACE
# ============================================================================

def main():
    """Main entry point for the population analytics system"""
    
    parser = argparse.ArgumentParser(description='Population Data Analytics System')
    parser.add_argument('--mode', choices=['full', 'dashboard', 'forecast', 'analysis', 'export'],
                       default='full', help='Run mode')
    parser.add_argument('--country', type=str, help='Country for specific analysis')
    parser.add_argument('--generate-data', action='store_true', help='Generate new data')
    parser.add_argument('--output-dir', type=str, default='output', help='Output directory')
    
    args = parser.parse_args()
    
    # Create output directory
    os.makedirs(args.output_dir, exist_ok=True)
    
    # Initialize system
    system = PopulationAnalyticsSystem()
    
    # Run based on mode
    if args.mode == 'full':
        system.run_complete_analysis(generate_new_data=args.generate_data)
    
    elif args.mode == 'dashboard':
        if args.country:
            if 'world' in system.data or args.generate_data:
                if 'world' not in system.data:
                    system._generate_all_datasets()
                system.visualizer.create_comprehensive_dashboard(system.data['world'], args.country)
            else:
                logger.error("No data available. Use --generate-data or run full mode first.")
        else:
            logger.error("Please specify a country with --country")
    
    elif args.mode == 'forecast':
        if args.country:
            if 'world' in system.data or args.generate_data:
                if 'world' not in system.data:
                    system._generate_all_datasets()
                
                country_data = system.data['world'][system.data['world']['country'] == args.country]
                if len(country_data) > 10:
                    population_series = pd.Series(
                        country_data['population'].values,
                        index=country_data['year'].values
                    )
                    forecasts = system.predictor.perform_time_series_forecasting(population_series, steps=30)
                    system.predictor.plot_forecast_comparison(population_series, forecasts)
                else:
                    logger.error(f"Insufficient data for {args.country}")
            else:
                logger.error("No data available. Use --generate-data or run full mode first.")
        else:
            logger.error("Please specify a country with --country")
    
    elif args.mode == 'analysis':
        if 'world' in system.data or args.generate_data:
            if 'world' not in system.data:
                system._generate_all_datasets()
            
            results = system.statistician.perform_comprehensive_analysis(system.data['world'])
            logger.info("Analysis completed. Results saved to output_data/")
        else:
            logger.error("No data available. Use --generate-data or run full mode first.")
    
    elif args.mode == 'export':
        system._export_all_results()
    
    logger.info("Population analytics completed successfully")


# ============================================================================
# EXAMPLE USAGE AND DEMONSTRATION
# ============================================================================

if __name__ == "__main__":
    
    # Example 1: Quick dashboard for a specific country
    def example_country_dashboard():
        """Create dashboard for a specific country"""
        system = PopulationAnalyticsSystem()
        
        # Generate data
        system._generate_all_datasets()
        
        # Create dashboard for China
        system.visualizer.create_comprehensive_dashboard(system.data['world'], 'China')
    
    # Example 2: Forecasting example
    def example_forecasting():
        """Demonstrate forecasting capabilities"""
        system = PopulationAnalyticsSystem()
        system._generate_all_datasets()
        
        # Get China data
        china_data = system.data['world'][system.data['world']['country'] == 'China']
        china_data = china_data.sort_values('year')
        
        # Create time series
        population_series = pd.Series(
            china_data['population'].values,
            index=china_data['year'].values
        )
        
        # Generate forecasts
        forecasts = system.predictor.perform_time_series_forecasting(population_series, steps=20)
        
        # Create ensemble forecast
        ensemble = system.predictor.create_ensemble_forecast(forecasts, method='weighted_average')
        
        # Plot comparison
        system.predictor.plot_forecast_comparison(population_series, forecasts)
        
        return forecasts, ensemble
    
    # Example 3: Complete analysis pipeline
    def example_complete_pipeline():
        """Run complete analysis pipeline"""
        system = PopulationAnalyticsSystem()
        system.run_complete_analysis(generate_new_data=True)
        return system
    
    # Example 4: Interactive visualizations
    def example_interactive_viz():
        """Create interactive visualizations"""
        system = PopulationAnalyticsSystem()
        system._generate_all_datasets()
        system.visualizer.create_interactive_visualizations(system.data['world'])
    
    # Example 5: Statistical analysis
    def example_statistical_analysis():
        """Perform comprehensive statistical analysis"""
        system = PopulationAnalyticsSystem()
        system._generate_all_datasets()
        
        # Perform analysis
        results = system.statistician.perform_comprehensive_analysis(system.data['world'])
        
        # Print key findings
        if 'hypothesis_tests' in results:
            for test_name, test_result in results['hypothesis_tests'].items():
                if 'significant' in test_result and test_result['significant']:
                    print(f"{test_name}: Significant (p={test_result['pvalue']:.4f})")
                else:
                    print(f"{test_name}: Not significant (p={test_result['pvalue']:.4f})")
        
        return results
    
    # Run the main function by default
    main()
    
    # Uncomment to run specific examples:
    # example_country_dashboard()
    # example_forecasting()
    # example_complete_pipeline()
    # example_interactive_viz()
    # example_statistical_analysis()
