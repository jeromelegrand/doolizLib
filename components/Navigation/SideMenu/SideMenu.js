import React, {useContext} from 'react';
import {SideMenuContext} from './SideMenuContext';
import {ComposerContext} from '../../Composer/ComposerContext';
import LeftMenu from './LeftMenu/LeftMenu';
import RightMenu from './RightMenu/RightMenu';
import Svg from '../../Svg/Svg';
import './SideMenu.scss';
import {colorBlue, colorDark, colorBlueDarken, colorDarkLighten} from '../../../../../css/colors.scss';
import {Cross, Puzzle, Spanner} from '../../Svg/SvgImages';

const SideMenu = ({side}) => {

    const {leftMenuIsOpen, setLeftMenuIsOpen, rightMenuIsOpen, setRightMenuIsOpen} = useContext(SideMenuContext);
    const {toggleElementSelection} = useContext(ComposerContext);
    const leftSide = side === 'left';

    const toggleSideMenu = () => {
        leftSide ?
            setLeftMenuIsOpen(!leftMenuIsOpen) :
            setRightMenuIsOpen(!rightMenuIsOpen);
    };

    const toggleClickExceptions = event => {
        if (side === 'left') {
            toggleElementSelection(event, null);
        }
    };

    return (
        <React.Fragment>
            <nav
                className={`sideMenu ${side} ${(leftSide ? leftMenuIsOpen : rightMenuIsOpen) ? 'open' : 'close'}`}
                onClick={toggleClickExceptions}
            >
                {(leftSide ? leftMenuIsOpen : rightMenuIsOpen) ?
                    <div className='content'>
                        <button
                            id={leftSide ? 'leftToggleMenuButton' : 'rightToggleMenuButton'}
                            className='btn toggleButton'
                            onClick={toggleSideMenu}
                        >
                            <Svg color={colorDark} height={24} width={24} image={Cross} hoverColor={colorDarkLighten}/>
                        </button>
                        {leftSide ? <LeftMenu/> : <RightMenu/>}
                    </div>
                    :
                    <button
                        id={leftSide ? 'leftToggleMenuButton' : 'rightToggleMenuButton'}
                        className='btn toggleButton'
                        onClick={toggleSideMenu}
                    >
                        {leftSide ?
                            <Svg color={colorBlue} image={Puzzle} hoverColor={colorBlueDarken}/>
                            :
                            <Svg color={colorBlue} image={Spanner} hoverColor={colorBlueDarken}/>
                        }
                    </button>
                }
            </nav>
        </React.Fragment>
    );
};

export default SideMenu;
