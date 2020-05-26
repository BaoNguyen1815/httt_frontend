import ContainerComponent from "containers/components/layout/container";
import { MDBContainer, MDBRow } from "mdbreact";
import React from "react";
import { Bar } from "react-chartjs-2";

class StatsComponent extends React.Component {
  state = {
    dataBar: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Units of Product",
          data: [120, 100, 300, 150, 200, 90],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)"
          ]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };
  render() {
    return (
      <ContainerComponent>
        <MDBContainer>
          <MDBRow style={{ height: "80%" }}>
            <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
          </MDBRow>
        </MDBContainer>
      </ContainerComponent>
    );
  }
}
export default StatsComponent;
