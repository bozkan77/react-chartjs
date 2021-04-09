import React from "react";
// third party libraries
import { Chart, Bar } from "react-chartjs-2";
import "chartjs-plugin-lineheight-annotation";

const BarChart = ({ data }) => {
  return (
    <Bar
      data={data}
      options={{
        curvature: 5,
        responsive: true,
        lineHeightAnnotation: {
          always: false,
        },
      }}
      plugins={{
        id: "curvature",
        beforeInit: (chart, _easing) => {
          if (!chart.options.curvature) {
            return;
          }

          Chart.elements.Rectangle.prototype.draw = function () {
            const ctx = this._chart.ctx;
            const vm = this._view;

            let left, right, top, bottom, signX, signY, borderSkipped, radius;
            let borderWidth = vm.borderWidth;
            let cornerRadius = chart.options.curvature;

            if (cornerRadius > 20) {
              console.log("TEST");
              cornerRadius = 20;
            }
            if (!vm.horizontal) {
              left = vm.x - vm.width / 2;
              right = vm.x + vm.width / 2;
              top = vm.y;
              bottom = vm.base;

              signX = 1;
              signY = bottom > top ? 1 : -1;
              borderSkipped = vm.borderSkipped || "bottom";
            } else {
              left = vm.base;
              right = vm.x + vm.width / 2;
              top = vm.y;
              bottom = vm.base;

              signX = 1;
              signY = bottom > top ? 1 : -1;
              borderSkipped = vm.borderSkipped || "left";
            }

            if (borderWidth) {
              const barSize = Math.min(
                Math.abs(left - right),
                Math.abs(top - bottom)
              );
              borderWidth = borderWidth > barSize ? barSize : borderWidth;

              const halfStroke = borderWidth / 2;

              const borderLeft =
                left + (borderSkipped !== "left" ? halfStroke + signX : 0);
              const borderRight =
                right + (borderSkipped !== "right" ? halfStroke + signX : 0);
              const borderTop =
                top + (borderSkipped !== "top" ? halfStroke + signY : 0);
              const borderBottom =
                bottom + (borderSkipped !== "bottom" ? halfStroke + signY : 0);

              if (borderLeft !== borderRight) {
                top = borderTop;
                bottom = borderBottom;
              }

              if (borderTop !== borderBottom) {
                left = borderLeft;
                right = borderRight;
              }
            }
            ctx.beginPath();
            ctx.fillStyle = vm.backgroundColor;
            ctx.strokeStyle = vm.borderColor;
            ctx.lineWidth = borderWidth;

            const corners = [
              [left, bottom],
              [left, top],
              [right, top],
              [right, bottom],
            ];

            const borders = ["bottom", "left", "top", "right"];
            let startCorner = borders.indexOf(borderSkipped, 0);
            if (startCorner === -1) {
              startCorner = 0;
            }

            function cornerAt(index) {
              return corners[(startCorner + index) % 4];
            }

            let corner = cornerAt(0);
            let width, height, x, y, nextCornerID, nextCorner;
            let xTL, xTR, yTL, yTR;
            let xBL, xBR, yBL, yBR;
            ctx.moveTo(corner[0], corner[0]);

            for (let i = 0; i < 4; i++) {
              corner = cornerAt(1);
              nextCornerID = i + 1;
              if (nextCornerID === 4) {
                nextCornerID = 0;
              }
              nextCorner = cornerAt(nextCornerID);
              width = corners[2][0] - corners[1][0];
              height = corners[0][1] - corners[1][1];
              x = corners[1][0];
              y = corners[1][1];

              radius = cornerRadius;
              if (radius > Math.abs(height) / 2) {
                radius = Math.floor(Math.abs(height) / 2);
              }
              if (radius > Math.abs(width) / 2) {
                radius = Math.floor(Math.abs(width) / 2);
              }
              if (height < 0) {
                xTL = x;
                xTR = x + width;
                yTL = y + height;
                yTR = y + height;

                xBL = x;
                xBR = x + width;
                yBL = y;
                yBR = y + height;

                ctx.moveTo(xBL + radius, yBL);
                ctx.lineTo(xBR - radius, xBL);
                ctx.quadraticCurveTo(xBR, yBR, xBR, yBR - radius);
                ctx.lineTo(xTR, yTR + radius);
                ctx.quadraticCurveTo(xTR, yTR, xTR - radius, yTR);
                ctx.lineTo(xTL + radius, yTL);
                ctx.quadraticCurveTo(xTL, yTL, xTL, yTL + radius);
                ctx.lineTo(xBL, yBL - radius);
                ctx.quadraticCurveTo(xBL, yBL, xBL + radius, yBL);
              } else if (width < 0) {
                xTL = x + width;
                xTR = x;
                yTL = y;
                yTR = y;

                xBL = x + width;
                xBR = x;
                yBL = y + height;
                yBR = y + height;

                ctx.moveTo(xBL + radius, yBL);
                ctx.lineTo(xBR - radius, xBL);
                ctx.quadraticCurveTo(xBR, yBR, xBR, yBR - radius);
                ctx.lineTo(xTR, yTR + radius);
                ctx.quadraticCurveTo(xTR, yTR, xTR - radius, yTR);
                ctx.lineTo(xTL + radius, yTL);
                ctx.quadraticCurveTo(xTL, yTL, xTL, yTL + radius);
                ctx.lineTo(xBL, yBL - radius);
                ctx.quadraticCurveTo(xBL, yBL, xBL + radius, yBL);
              } else {
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, xBL);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(
                  x + width,
                  y + height,
                  x + width - radius,
                  y + height
                );
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
              }
            }

            ctx.fill();
            if (borderWidth) {
              ctx.stroke();
            }
          };
        },
      }}
    />
  );
};

export default BarChart;
