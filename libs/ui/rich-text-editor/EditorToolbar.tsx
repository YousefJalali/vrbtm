export default function EditorToolbar() {
  // hide in touch devices
  if (window.matchMedia("(pointer: coarse)").matches) {
    return <div id="toolbar" />
  }

  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        {/* <button className="ql-underline" />
          <button className="ql-strike" /> */}
        {/* <button className="ql-mark" /> */}
      </span>

      {/* <span className="ql-formats">
          <select className="ql-align" />
          <select className="ql-color" />
        </span> */}

      {/* <span className="ql-formats">
          <button className="ql-image" />
        </span> */}

      <span className="ql-formats">
        <button className="ql-undo">
          <svg viewBox="0 0 18 18">
            <polygon
              className="ql-fill ql-stroke"
              points="6 10 4 12 2 10 6 10"
            />
            <path
              className="ql-stroke"
              d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
            />
          </svg>
        </button>
        <button className="ql-redo">
          <svg viewBox="0 0 18 18">
            <polygon
              className="ql-fill ql-stroke"
              points="12 10 14 12 16 10 12 10"
            />
            <path
              className="ql-stroke"
              d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
            />
          </svg>
        </button>
      </span>
    </div>
  )
}
