import React from 'react'

const AreaControls = ({ areas, onAddArea, onSetActive, onDeleteArea , onAreaChange, onShowCode}) => {
  return (
    <div className="area-controls">

      <div className="area-header">
        <span>Active</span>
        <span>Shape</span>
        <span>Link</span>
        <span>Title</span>
        <span>Target</span>
        <span></span>
      </div>

      {areas.map((area) => (
        <div className="area-row" key={area.id}>
          <input type="radio" checked={area.active} onChange={()=> onSetActive(area.id)} readOnly />

          <select value={area.shape} onChange={(e)=>onAreaChange(area.id, "shape", e.target.value)}>
            <option value="">--</option>
            <option value="rect">Rect</option>
            <option value="circle">Circle</option>
            <option value="poly">Poly</option>
          </select>

          <input placeholder="link" value={area.link} onChange={(e)=> onAreaChange(area.id, "link", e.target.value)} />
          <input placeholder="Title" value={area.title} onChange={(e)=> onAreaChange(area.id, "title", e.target.value)} />

          <select value={area.target} onChange={(e)=> onAreaChange(area.id ,"target",e.target.value)} >
            <option value="">--</option>
            <option value="_blank">_blank</option>
            <option value="_self">_self</option>
            <option value="_parent">_parent</option>
            <option value="_top">_top</option>
          </select>

          <button className="delete-btn" onClick={()=> onDeleteArea(area.id)}>✖</button>
        </div>
      ))}

      <div className="area-actions">
        <button className="add-btn" onClick={onAddArea}>
          + Add New Area
        </button>
      </div>

      <div className="code-btn-wrapper" onClick={onShowCode}>
        <button className="code-btn">Show Me The Code!</button>
      </div>

    </div>
  )
}

export default AreaControls
