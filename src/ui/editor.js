'use strict';

import React, { useRef, useState, useLayoutEffect } from 'react';

import Toolbar from './toolbar';
import Findbar from './findbar';
import LinkPopup from './link-popup';

function Editor(props) {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(props.editorCore.pluginState);

  useLayoutEffect(() => {
    props.editorCore.onUpdateState = (state) => {
      setEditorState(props.editorCore.pluginState);
    }
    editorRef.current.appendChild(props.editorCore.view.dom);
  }, []);

  return (
    <div className="editor">
      {!props.readOnly &&
      <Toolbar menuState={editorState.menu} linkState={editorState.link} searchState={editorState.search}/>}
      {editorState.search.active && <Findbar searchState={editorState.search}/>}
      <div className="editor-core" ref={editorRef}>
        <div className="relative-container">{editorState.link &&
        <LinkPopup parentRef={editorRef} linkState={editorState.link.popup} onOpenUrl={props.onOpenUrl}/>}</div>
      </div>
    </div>
  );
}

export default Editor;
