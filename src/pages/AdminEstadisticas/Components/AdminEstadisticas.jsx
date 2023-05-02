import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "../Style/estadisticas.css";
export const AdminEstadisticas = () => {
  return (
    <PowerBIEmbed
      embedConfig={{
        type: "report", // Supported types: report, dashboard, tile, visual and qna
        id: "760d3a5e-d514-4682-ad67-d89d0bab4f5d",
        embedUrl:
          "https://app.powerbi.com/reportEmbed?reportId=760d3a5e-d514-4682-ad67-d89d0bab4f5d&groupId=8a7f4b07-a6e8-42f9-a378-704560de57d5&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
        accessToken:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzNhOTM5OTAtOGJiNC00YjlkLWI0MjItNGY4ODUxMjE3ZDdlLyIsImlhdCI6MTY4Mjg5Njc2OCwibmJmIjoxNjgyODk2NzY4LCJleHAiOjE2ODI5MDE1NTIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFQbVpHRFNJUVI4QS9uZm05S2t5ZW5TMVQ3TzVEVy9mQ0kwS21WWUxnRjl4ZytlSGJPRk5ZSGc3WHU3YUFOMzBOIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiRlVFTlRFUyBNQUxET05BRE8iLCJnaXZlbl9uYW1lIjoiQUxFWCBBTEZSRURPIiwiaXBhZGRyIjoiMTYxLjAuMTk3LjEwOCIsIm5hbWUiOiJBTEVYIEFMRlJFRE8gRlVFTlRFUyBNQUxET05BRE8iLCJvaWQiOiIxMWM2ZTI1NC0xYzYyLTQ5YzItYjc5OS0yMWY2OWU1ZDI2NDMiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtNzc4MTEzMjk1LTIwMjA1ODMzODQtMTMyMDE3OTAtMzczMjAxIiwicHVpZCI6IjEwMDMwMDAwQTcyNjIyRjciLCJyaCI6IjAuQVZrQWtEbXBNN1NMblV1MElrLUlVU0Y5ZmdrQUFBQUFBQUFBd0FBQUFBQUFBQUJaQUVRLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IlZHOEhRN2NVWVhFWXo0Vk43cVVNNlcxX2tfcmpkVGE3SVlHd0FxS3B3YzAiLCJ0aWQiOiIzM2E5Mzk5MC04YmI0LTRiOWQtYjQyMi00Zjg4NTEyMTdkN2UiLCJ1bmlxdWVfbmFtZSI6ImFhZnVlbnRlc0B1bmFoLmhuIiwidXBuIjoiYWFmdWVudGVzQHVuYWguaG4iLCJ1dGkiOiJlTXp6VWFieHhFLU1tcEN0bkxqbkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.pRHzAAVYQHlFTEN7_WuI5Pi8W6xxIIV7NB8kKcV0NHmIHHrqyZhiZTl1Az8fsIX3_FeXCdp0wxDXK0iesioNwdH2TVEoC8wWoljHbG1EVjTqqkV8o68IWpjfN3hg37gNWijCb-_OZencsEyY2W_3rSGvNrc6wWsTw0TGTyxhLVGbNkeAPjQYT1kQZBrLHodpv3qhumGtucxPYP-nT5IYDq2kro7AwZO0r6sqV-KDTnTSHkeYKMd_WpwBdLwD2NckzsSbPCMrc9IpB45Aq5vJ6AL85mMlhZ6BkBX8K6p5EUSsp10x0FSxNiHc-olfosfj_6fy6qClbf_i9h399axOhg",
        tokenType: models.TokenType.Aad,
        settings: {
          panes: {
            filters: {
              expanded: true,
              visible: true,
            },
          },
          background: models.BackgroundType.Transparent,
        },
      }}
      eventHandlers={
        new Map([
          [
            "loaded",
            function () {
              console.log("Report loaded");
            },
          ],
          [
            "rendered",
            function () {
              console.log("Report rendered");
            },
          ],
          [
            "error",
            function (event) {
              console.log(event.detail);
            },
          ],
        ])
      }
      cssClassName={"Embed-container"}
      getEmbeddedComponent={(embeddedReport) => {
        window.report = embeddedReport;
      }}
    />
  );
};
