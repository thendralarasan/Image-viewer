import React from 'react'

const AreaControls = () => {
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

  <div className="area-row">
    <input type="radio" checked readOnly />
    <select>
       <option>--</option>
      <option>Rect</option>
      <option>Circle</option>
      <option>Poly</option>
    </select>
    <input placeholder="link" />
    <input placeholder="Title" />
    <select>
        <option>--</option>
      <option>_blank</option>
      <option>_self</option>
      <option>_parent</option>
       <option>_top</option>
    </select>
    <button className="delete-btn">✖</button>
  </div>

  <div className="area-actions">
    <button className="add-btn">+ Add New Area</button>
  </div>

  <div className="code-btn-wrapper">
    <button className="code-btn">Show Me The Code!</button>
  </div>
</div>

  )
}


export default AreaControls
