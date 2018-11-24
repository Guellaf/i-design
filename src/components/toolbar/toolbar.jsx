import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fire from '../../config/fire';
import { MdSettings, MdUndo, MdDirectionsRun } from 'react-icons/lib/md';
import { FaFileO, FaMousePointer } from 'react-icons/lib/fa';
import ToolbarButton from './toolbar-button';
import ToolbarSaveButton from './toolbar-save-button';
import ToolbarLoadButton from './toolbar-load-button';
import ModalDontLogged from '../navbar/modalDontLogged';
import If from '../../utils/react-if';
import {
  MODE_IDLE,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT
} from '../../constants';
import * as SharedStyle from '../../shared-style';

const iconTextStyle = {
  fontSize: '19px',
  textDecoration: 'none',
  fontWeight: 'bold',
  margin: '0px',
  userSelect: 'none'
};

const Icon2D = ( {style} ) => <p style={{...iconTextStyle, ...style, paddingTop: '5px'}}>2D</p>;
const Icon3D = ( {style} ) => <p style={{...iconTextStyle, ...style, paddingTop: '10px'}}>3D</p>;

const ASIDE_STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: '10px'
};

const sortButtonsCb = (a, b) => {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

const mapButtonsCb = (el, ind) => {
  return (
    <If
      key={ind}
      condition={el.condition}
      style={{ position: 'relative' }}
    >
      {el.dom}
    </If>
  );
};

export default class Toolbar extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { modal: false, modalLogin: false, modalSignup: false,}

    this.save = this.save.bind(this)
    // this.writeUserData = this.writeUserData.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleModalLogin = this.toggleModalLogin.bind(this)
    this.toggleModalSignup = this.toggleModalSignup.bind(this)
  }

  save (a) {
    if(fire.auth().currentUser) {
      let uid = fire.auth().currentUser.uid;
      this.writeUserData(uid, "project13456", a)
    }else {
      this.toggleModal()
    }
    console.log('will be save')
    // fire.database().ref("project").once("value", function(snap) {
    //   console.log("snap",snap.val())
    // }, function(err) {
    //   // error callback triggered with PERMISSION_DENIED
    // });
  }

  toggleModal () {
    this.setState({modal: !this.state.modal, modalLogin: false, modalSignup: false})
  }

  toggleModalLogin () {
    this.setState({modalLogin: !this.state.modalLogin})
  }

  toggleModalSignup () {
    this.setState({modalSignup: !this.state.modalSignup})
  }



  // writeUserData (uid, name, file) {
  //   console.log('user save');
  //   name = {name: name, file: file};
  //   fire.database().ref('/project/'+uid).set({
  //     name
  //   });
  // }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.state.mode !== nextProps.state.mode ||
      this.props.height !== nextProps.height ||
      this.props.width !== nextProps.width ||
      this.props.state.modalDontLogged === nextProps.state.modalDontLogged ||
      this.props.state.alterate !== nextProps.state.alterate;
  }



  render() {
    let {
      props: { state, width, height, toolbarButtons, allowProjectFileSupport },
      context: { projectActions, viewer3DActions, translator }
    } = this;

    let mode = state.get('mode');
    let alterate = state.get('alterate');
    let alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : '';

    let sorter = [
      {
        index: 0, condition: allowProjectFileSupport, dom: <ToolbarButton
          active={false}
          tooltip={translator.t('New project')}
          onClick={event => confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null}>
          <FaFileO />
        </ToolbarButton>
      },
      {
        index: 1, condition: allowProjectFileSupport,
        dom: <ToolbarSaveButton state={state} props={this.props.state} save={this.save}/>
      },
      {
        index: 2, condition: allowProjectFileSupport,
        dom: <ToolbarLoadButton state={state} />
      },
      {
        index: 3, condition: true,
        dom: <ToolbarButton
          active={[MODE_VIEWING_CATALOG].includes(mode)}
          tooltip={translator.t('Open catalog')}
          onClick={event => projectActions.openCatalog()}>
          <img src="https://i.imgur.com/B7WT3Dx.png" className="suite-icon" />
        </ToolbarButton>
      },
      {
        index: 4, condition: true, dom: <ToolbarButton
          active={[MODE_3D_VIEW].includes(mode)}
          tooltip={translator.t('3D View')}
          onClick={event => viewer3DActions.selectTool3DView()}>
          <Icon3D />
        </ToolbarButton>
      },
      {
        index: 5, condition: true, dom: <ToolbarButton
          active={[MODE_IDLE].includes(mode)}
          tooltip={translator.t('2D View')}
          onClick={event => projectActions.setMode( MODE_IDLE )}>
          <Icon2D />
        </ToolbarButton>
      },
      {
        index: 6, condition: true, dom: <ToolbarButton
          active={[MODE_3D_FIRST_PERSON].includes(mode)}
          tooltip={translator.t('3D First Person')}
          onClick={event => viewer3DActions.selectTool3DFirstPerson()}>
          <MdDirectionsRun />
        </ToolbarButton>
      },
      {
        index: 7, condition: true, dom: <ToolbarButton
          active={false}
          tooltip={translator.t('Undo (CTRL-Z)')}
          onClick={event => projectActions.undo()}>
          <MdUndo />
        </ToolbarButton>
      },
      {
        index: 8, condition: true, dom: <ToolbarButton
          active={[MODE_CONFIGURING_PROJECT].includes(mode)}
          tooltip={translator.t('Configure project')}
          onClick={event => projectActions.openProjectConfigurator()}>
          <MdSettings />
        </ToolbarButton>
      }
    ];

    sorter = sorter.concat(toolbarButtons.map((Component, key) => {
      return Component.prototype ? //if is a react component
        {
          condition: true,
          dom: React.createElement(Component, { mode, state, key })
        } :
        {                           //else is a sortable toolbar button
          index: Component.index,
          condition: Component.condition,
          dom: React.createElement(Component.dom, { mode, state, key })
        };
    }));


    return (
      <aside style={{ ...ASIDE_STYLE, maxWidth: width, maxHeight: height }} className='toolbar'>
        {this.state.modal && <ModalDontLogged
        toggleModal={this.toggleModal}
        modalLogin={this.state.modalLogin}
        modalSignup={this.state.modalSignup}
        modal={this.state.modal}
        toggleModalLogin={this.toggleModalLogin}
        toggleModalSignup={this.toggleModalSignup}/>}

        {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
      </aside>
    )
  }
}

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
