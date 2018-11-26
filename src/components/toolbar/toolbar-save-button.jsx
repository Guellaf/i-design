import React from 'react';
import PropTypes from 'prop-types';
import IconSave from 'react-icons/lib/fa/floppy-o';
import { FaDownload } from 'react-icons/lib/fa';
import ToolbarButton from './toolbar-button';
import {browserDownload}  from '../../utils/browser';
import { Project } from '../../class/export';

export default function ToolbarSaveButton({state, props, save, type}, {translator}) {


  let saveProjectToFile = e => {
    e.preventDefault();
    state = Project.unselectAll( state ).updatedState;
    if(type == 'download') {
      browserDownload(state.get('scene').toJS());
    } else {
      save(state.get('scene').toJS())
    }
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t('Save project')} onClick={saveProjectToFile}>
      {type == 'download' ? <FaDownload /> : <IconSave /> }
    </ToolbarButton>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired,
};
