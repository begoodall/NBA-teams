export default function InfoPanel({ displayPanel, teamInfo, handleInfoPanelClose }) {
  console.log(teamInfo);
  return (
    <div className={displayPanel ? "info-panel active" : "info-panel"}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1>{teamInfo.name}</h1>
        <div onClick={() => handleInfoPanelClose()}>x</div>
      </div>
    </div>
  )
}