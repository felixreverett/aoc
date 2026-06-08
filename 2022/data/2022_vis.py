import matplotlib.pyplot as plt
import pandas as pd

import string
import sys
import ast

def create_combined_chart(data):
    x_days = data['Day']
    y_avg = data['Average']
    y_min = data['Min']
    y_max = data['Max']

    y_cumulative = y_avg.cumsum()

    lower_error = y_avg - y_min
    upper_error = y_max - y_avg
    asymmetric_error = [lower_error, upper_error]

    fix, ax1 = plt.subplots(figsize=(12, 6))

    bars = ax1.bar(
        x_days,
        y_avg,
        yerr=asymmetric_error,
        color='skyblue',
        edgecolor='navy',
        capsize=4,
        label='Daily average (with min/max)')
    
    ax1.set_xlabel('Day', fontweight='bold', labelpad=10)
    ax1.set_ylabel('Execution time (ms)')

    ax1.tick_params(axis='y', labelcolor='navy')
    ax1.grid(True, linestyle='--', alpha=0.3)

    ax2 = ax1.twinx()

    line = ax2.plot(x_days, y_cumulative, color='crimson', marker='o', linewidth=2.5, label='Cumulative time')

    ax2.set_ylabel('Cumulative execution time (ms)', color='crimson', fontweight='bold')
    ax2.tick_params(axis='y', labelcolor='crimson')

    plt.title('Performance Metrics for Advent of Code 2022 (Scala)', fontsize=14, fontweight='bold', pad=15)
    ax1.set_xticks(x_days)
    ax1.set_xticklabels(x_days, rotation=45, ha='right')

    lines_labels=[ax1.get_legend_handles_labels(), ax2.get_legend_handles_labels()]
    handles = lines_labels[0][0] + lines_labels[1][0]
    labels = lines_labels[0][1] + lines_labels[1][1]
    ax1.legend(handles, labels, loc='upper left')

    plt.tight_layout()

    output_path = "data/2022_performance_chart.jpg"

    plt.savefig(output_path, format='jpg', dpi=300, facecolor='white')
    print("[+] Chart successfully exported to " + output_path)

    plt.close()


def create_line_graph(data):
    x_days = data['Day']
    y_avg = data['Average']
    y_min = data['Min']
    y_max = data['Max']

    plt.figure(figsize=(10, 6))

    plt.plot(x_days, y_avg, label="Average Time", color='blue', marker='o', linewidth=2)

    plt.fill_between(x_days, y_min, y_max, color='blue', alpha=0.2, label='Min/Max Range')

    plt.xlabel('Advent of Code 2022 Days')
    plt.ylabel('Execution time (ms)')
    plt.title('Performance Metrics Advent of Code 2022 (Scala)')

    plt.legend(loc='upper left')
    plt.grid(True, linestyle='--', alpha=0.6)
    plt.xticks(rotation=45)

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":

    filename = "data/2022_results.txt"

    data = pd.read_csv(filename)

    #create_line_graph(data)
    create_combined_chart(data)