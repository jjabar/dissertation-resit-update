import { StyleSheet, View, Dimensions, Text } from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import React from 'react'


const LineChartComponent = ({stats}) => {
    
  const width = Dimensions.get("window").width;
    const data = {
      labels: stats?.labels,
      datasets: [
        {
          data: stats?.averageTemp,
          
        }
      ],
      legend: ["Average Temperature"] 
    }
    const data1 = {
      labels: stats?.labels,
      datasets: [
        {
          data: stats?.averageHeartBeat,
        },
      ],
      legend: ["Average Heartbeat"],
    };

   

    

  return (
    <View>
      <Text style={styles.textStyle}>Average Temperature per hour of the day</Text>
      <LineChart
        data={data}
        width={width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <Text style={styles.textStyle}>Average Heartbeat per hour of the day</Text>
      <LineChart
        data={data1}
        width={width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#ffb3c6",
          backgroundGradientFrom: "#ff8fab",
          backgroundGradientTo: "#fb6f92",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#e76f51",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

export default LineChartComponent

const styles = StyleSheet.create({
  textStyle: {
    color: "green",
    marginTop: 10,
  }
})