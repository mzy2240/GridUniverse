<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" width="600">
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          Report
        </v-card-title>
        <!-- <v-card-media>
					<div id='chart' class="chart"></div>
				</v-card-media> -->
        <div id="reportchart" class="reportchart pa-5"></div>
        <v-card-text>
          <v-textarea
            name="input-7-1"
            v-model="comment"
            filled
            label="Comment (optional)"
            auto-grow
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.native="share"
            >Share</v-btn
          >
          <v-btn color="blue darken-1" text @click.native="activate"
            >Download</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<style scoped>
.reportchart {
  height: 300px;
  width: 100%;
}
</style>

<script>
import { mean } from "mathjs/lib/esm/number";
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  SingleAxisComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  MarkPointComponent,
  MarkLineComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import darkTheme from "../assets/dark.js";
echarts.registerTheme('dark', darkTheme);

echarts.use([
  TitleComponent,
  TooltipComponent,
  SingleAxisComponent,
  LineChart,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  MarkPointComponent,
  MarkLineComponent,
  CanvasRenderer
]);

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    topic: {
      default: "",
    },
  },
  data() {
    return {
      content: "",
      time: null,
      comment: null,
      rules: {
        prohibited: (value) =>
          (value != "data" && value != "user" && value != "note") ||
          "Cannot use the reserved topic",
      },
    };
  },
  mounted() {
    this.initChart();
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.display = [];
          this.childshow = false;
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    initChart() {
      const timeArray = this.$store.state.report.score.map(function (item) {
        return item["time"] - 1280941800;
      });
      const RIndexArray = this.$store.state.report.score.map(function (item) {
        return item["RIndex"];
      });
      // console.log(RIndexArray);
      if (RIndexArray.length) {
        const userTimeArray = this.$store.state.report.user.map(function (
          item
        ) {
          return item["time"] - 1280941800;
        });
        const userEventArray = this.$store.state.report.user.map((item) => {
          return (
            item["event"][0] +
            " " +
            this.findName([
              item["event"][0],
              item["event"][1].split(",")[0] +
                "," +
                item["event"][1].split(",")[1],
            ]) +
            ": " +
            item["event"][2]
          );
        });
        let x,
          y,
          markPointData = [];
        for (let i in userTimeArray) {
          x = timeArray.indexOf(userTimeArray[i]);
          // y = RIndexArray[x];
          // x = userTimeArray[i].toString();
          y = RIndexArray[i];
          markPointData.push({
            name: "User",
            xAxis: x,
            yAxis: y,
            // coord: [x, y],
            symbol: 'triangle',
            symbolSize: 10,
            emphasis: {
              label: {
                show: true,
                position: "top",
                color: "auto",
                formatter: userEventArray[i],
              },
            },
          });
        }
        var chart = echarts.init(document.getElementById("reportchart"), "dark");
        console.log(markPointData);
        chart.setOption({
          title: {
            text: "Average RIndex: " + mean(RIndexArray).toFixed(0).toString(),
            left: "left",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            data: timeArray,
          },
          yAxis: {
            splitLine: {
              show: false,
            },
          },
          toolbox: {
            left: "center",
            showTitle: false,
            feature: {
              dataZoom: {
                yAxisIndex: "none",
              },
              restore: {},
              saveAsImage: {},
            },
          },
          dataZoom: [
            {
              startValue: "0",
            },
            {
              type: "inside",
            },
          ],
          visualMap: {
            top: 10,
            right: 10,
            pieces: [
              {
                gt: 0,
                lte: 60,
                color: "#7e0023",
              },
              {
                gt: 60,
                lte: 80,
                color: "#f57c00",
              },
              {
                gt: 80,
                lte: 90,
                color: "#ffeb3b",
              },
              {
                gt: 90,
                lte: 100,
                color: "#1b5e20",
              },
            ],
            outOfRange: {
              color: "#999",
            },
          },
          series: [
            {
              name: "RIndex",
              type: "line",
              id: "line",
              data: RIndexArray,
              markPoint: {
                symbol: "triangle",
                symbolSize: 8,
                itemStyle: {
                  color: "yellow",
                },
                data: markPointData,
              },
              markLine: {
                silent: true,
                symbol: "none",
                data: [
                  {
                    yAxis: 60,
                  },
                  {
                    yAxis: 80,
                  },
                  {
                    yAxis: 90,
                  },
                  {
                    yAxis: 100,
                  },
                ],
              },
            },
          ],
        });
      } else {
        console.log("Warning: Empty array!");
      }
    },
    activate() {
      this.$store.commit("setReportName", this.$store.state.username);
      this.$store.commit("setReportComment", this.comment);

      const report = JSON.stringify({
        Time: new Date(),
        Content: this.$store.state.report,
      });
      const blob = new Blob([report], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = "UIN-Name-CaseX.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
      this.show = false;
    },
    share(){
      const report = JSON.stringify({
        Time: new Date(),
        Content: this.$store.state.report,
      });
      const blob = new Blob([report], { type: "text/plain" });
      const file = new File([blob], 'report.txt', { type: 'text/plain' });
      navigator.share({
        text: `I saved the Texas grid?! Checkout my GridVerse report!`,
        url: 'http://people.tamu.edu/~zeyumao2',
        title: 'GridVerse Report',
        files: [file]
      })
    },
    findName([type, id]) {
      if (["Gen", "Shunt"].includes(type)) {
        return this.$store.state.casedetail.content.Bus[
          this.$store.state.casedetail.content[type][id][
            "Int.Bus Number"
          ].toString()
        ]["String.Name"];
      } else if (type == "Load") {
        return id;
      } else {
        return id;
      }
    },
    // enterClicked() {
    // 	this.activate();
    // }
  },
};
</script>
