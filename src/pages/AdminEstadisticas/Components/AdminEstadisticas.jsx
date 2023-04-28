import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client';
import '../Style/estadisticas.css'
export const AdminEstadisticas = () => {
  return (
    <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual and qna
		id: '6607c8eb-d2e7-4f30-9101-19e4c4074259',
		embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=6607c8eb-d2e7-4f30-9101-19e4c4074259&groupId=256b17ea-d460-42a5-bcf8-35cba96cd8fa&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHl',
		accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzNhOTM5OTAtOGJiNC00YjlkLWI0MjItNGY4ODUxMjE3ZDdlLyIsImlhdCI6MTY4MjY0OTE2MywibmJmIjoxNjgyNjQ5MTYzLCJleHAiOjE2ODI2NTQ2MTMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFsMDVHcEhvODJJa29uMmVaVUNBM2cwVUU1TUJKeWYzZncwY3lVbVd4amdQSVZFSEZadjh2V3pUR0pSNVFxcnVxIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQ0FMSVggR09OWkFMRVoiLCJnaXZlbl9uYW1lIjoiQU5EUkVBIE1JQ0hFTExFIiwiaXBhZGRyIjoiMTYxLjAuMTk1LjExMyIsIm5hbWUiOiJBTkRSRUEgTUlDSEVMTEUgQ0FMSVggR09OWkFMRVoiLCJvaWQiOiJiZDViZWJiMi0wMWJjLTQyNmItOTc5OS1kYmI5MTA0NDRmMjAiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtNzc4MTEzMjk1LTIwMjA1ODMzODQtMTMyMDE3OTAtMzQ2OTIyIiwicHVpZCI6IjEwMDMwMDAwOUNEMDEzOEUiLCJyaCI6IjAuQVZrQWtEbXBNN1NMblV1MElrLUlVU0Y5ZmdrQUFBQUFBQUFBd0FBQUFBQUFBQUJaQUswLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Im9fck5Qc19ia3FkeEYxZ21XMnNEMVEwLXdoWlJmb3JtYXJoQ09MRUxfVTQiLCJ0aWQiOiIzM2E5Mzk5MC04YmI0LTRiOWQtYjQyMi00Zjg4NTEyMTdkN2UiLCJ1bmlxdWVfbmFtZSI6ImFtY2FsaXhnQHVuYWguaG4iLCJ1cG4iOiJhbWNhbGl4Z0B1bmFoLmhuIiwidXRpIjoidVdVSmtlRGVWMHV2OThnWTJmNDBBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.Mf8xQMmqdn6hMqdqlMWi_56aXRfnjTNQZMMugs8fdWTE1dx9CI2rJunSWQ2C1YP8yGtoVYv3_VkTz2QIsRsv7xya-uFSZBmZuNXVOMf0y1tGQ1m1EJD_pq3sjOdfsS2WNF7JgVObHDSTG9vOPUuopia6Q8MZ7igXWrvvSZIbkUxcZx1iWtEXGlJRPK4bBvfxqDtWQhc196Wqx_wRWzdWsDWpyLGqhtfIWJkZqVQ11mnU6fgH3a0a_KZvXzRAwZA0V2UyJYvU_Ner1NwlPq-SRaVeF4k5luF2hSiUToFmKhtjFUoGjN1eCKyr5FC5VWmqlnKnPYN3ZXa8jXi_0F0eyQ',
		tokenType: models.TokenType.Aad,
		settings: {
			panes: {
				filters: {
					expanded: true,
					visible: true
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = { 
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}]
		])
	}
		
	cssClassName = { "Embed-container" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport
	}}
/>
  )
}
