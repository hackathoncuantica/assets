import csv
import math
import pprint
import json
# https://networkx.github.io/
import networkx as nx
# https://github.com/taynaud/python-louvain
import community
import time

RADIUS = 1.0

MAX_DISTANCE = 0.1

SAMPLING_RATE = 10

AVERAGE_DEGREE = 10

REDSHIFT = "0.6"

FILE_IN = "../data/flagship_z" + REDSHIFT[0] + "p" + REDSHIFT[2] + "_slice.csv"

FILE_OUT = "network_" + REDSHIFT[0] + "p" + REDSHIFT[2] + "_" + str(AVERAGE_DEGREE) + ".gexf"

# From spherical to cartesian

def convert(galaxy):
    cos_phi = math.cos(galaxy['dec']/180 * math.pi)

    return {
            'x': RADIUS * cos_phi * math.cos(galaxy['ra']/180 * math.pi),
            'y': RADIUS * math.sin(galaxy['dec']/180 * math.pi),
            'z': RADIUS * cos_phi * math.sin(galaxy['ra']/180 * math.pi)
        }

# Get euclidean distance

def get_distance(galaxy_one, galaxy_two):
    point_one = convert(galaxy_one)
    point_two = convert(galaxy_two)

    return (math.sqrt((point_one['x'] - point_two['x'])*(point_one['x'] - point_two['x']) + (point_one['y'] - point_two['y'])*(point_one['y'] - point_two['y']) + (point_one['z'] - point_two['z'])*(point_one['z'] - point_two['z'])))


galaxy_data = []

print("Loading galaxy data into dict")

with open(FILE_IN, "r") as file_in:
    reader = csv.DictReader(file_in)

    for i,row in enumerate(reader):

        # Downsample

        if i % SAMPLING_RATE == 0:

            galaxy_data.append({
                "ra": float(row['ra_gal']),
                "dec": float(row['dec_gal']),
                "flux": float(row['lsst_i']),
                "z": float(row['z']),
                "id": i
            })

print("Calculating distance matrix")

num_nodes = len(galaxy_data)

max_links = num_nodes*AVERAGE_DEGREE

distances = []

network = {}

for source_index in range(0, len(galaxy_data) - 1):

    if source_index % 100 == 0:
        print("\tNode ", source_index, " of ", len(galaxy_data))

    for target_index in range(source_index+1, len(galaxy_data)):

        distance = get_distance(galaxy_data[source_index], galaxy_data[target_index])

        if distance < MAX_DISTANCE:
            distances.append({'distance': distance, 'source': source_index, 'target': target_index})

print("Sorting distances")

sorted_distances = sorted(distances, key = lambda entry: entry['distance'])

# Clip if above max links

if len(sorted_distances) > max_links:
    sorted_distances = sorted_distances[0:max_links]


print("Writing final network of ", num_nodes, " nodes and ", len(sorted_distances), " links")

for entry in sorted_distances:
    source_index = entry['source']
    target_index = entry['target']
    distance = entry['distance']

    if source_index not in network:
        network[source_index] = {}

    network[source_index][target_index] = distance


init_time = time.time()

G = nx.Graph()

print("Building graph")

num_links = 0

for source, entry in network.items():
    for target, distance in entry.items():
        G.add_edge(source, target)
        num_links += 1

print("Num links", num_links)

print("Calculating clustering coefficient")

cc = nx.average_clustering(G)

print("Clustering coefficient ", cc)

# print("Calculating average path length per component")
#
# for C in nx.connected_component_subgraphs(G):
#     print(nx.average_shortest_path_length(C))

print("Finding partitions")

partition = community.best_partition(G)

print("Modularity: ", community.modularity(partition, G))

print("Number of communities: ", len(set(partition.values())))

nx.set_node_attributes(G, partition, 'community')

print("Elapsed time: ", time.time() - init_time)

print("Writing file")

nx.write_gexf(G, FILE_OUT)

print("File written")
