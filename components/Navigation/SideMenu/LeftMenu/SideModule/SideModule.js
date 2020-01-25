import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import Svg from '../../../../Svg/Svg';
import './Col.scss';
import {colorDark, colorDarkLighten} from '../../../../../../../css/colors.scss';
import {
    Address,
    Book,
    Calendar,
    Car,
    Choice,
    Drag,
    File,
    GuestList,
    Identity,
    Image,
    Letters,
    Mail,
    Puzzle,
    QrCode,
    Reply,
    Separator,
    Star,
    Time
} from '../../../../Svg/SvgImages';

const SideModule = ({id, title, index, module}) => {

    const renderSvg = () => {
        switch (module) {
            case 'basic-text':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Letters}/>;
            case 'basic-image':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Image}/>;
            case 'basic-separator':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Separator}/>;
            case 'form-address':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Address}/>;
            case 'form-identity':
                return <Svg color={colorDark} hoverColor={colorDark} height={22} width={22} image={Identity}/>;
            case 'form-file':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={File}/>;
            case 'form-rating':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Star}/>;
            case 'form-choice':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Choice}/>;
            case 'form-text':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Letters}/>;
            case 'form-date':
                return <Svg color={colorDark} hoverColor={colorDark} height={20} width={20} image={Calendar}/>;
            case 'plugin-file':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={File}/>;
            case 'plugin-countdown':
                return <Svg color={colorDark} hoverColor={colorDark} height={18} width={18} image={Time}/>;
            case 'plugin-reply':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Reply}/>;
            case 'plugin-carpooling':
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Car}/>;
            case 'plugin-golden-book':
                return <Svg color={colorDark} hoverColor={colorDark} height={22} width={22} image={Book}/>;
            case 'plugin-guest-list':
                return <Svg color={colorDark} hoverColor={colorDark} height={20} width={20} image={GuestList}/>;
            case 'plugin-contact':
                return <Svg color={colorDark} hoverColor={colorDark} height={18} width={18} image={Mail}/>;
            case 'plugin-checkin':
                return <Svg color={colorDark} hoverColor={colorDark} height={22} width={22} image={QrCode}/>;
            default:
                return <Svg color={colorDark} hoverColor={colorDark} height={24} width={24} image={Puzzle}/>;
        }
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <React.Fragment>
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isdragging={snapshot.isDragging.toString()}
                        className={`side-menu-col ${snapshot.isDragging && 'side-menu-col-dragging'}`}
                    >
                        <div {...provided.dragHandleProps} id={`dragSideModule-${id}`}>
                            <Svg color={colorDark} height={20} width={20} image={Drag} hoverColor={colorDarkLighten}/>
                        </div>
                        <div className="draggable-item">
                            <p>{title}</p>
                            <div className="svg-container">
                                {renderSvg()}
                            </div>
                        </div>
                    </div>
                    {snapshot.isDragging && (
                        <div className='side-menu-col'>
                            <div {...provided.dragHandleProps}>
                                <Svg
                                    color={colorDark}
                                    height={20}
                                    width={20}
                                    image={Drag}
                                    hoverColor={colorDarkLighten}
                                />
                            </div>
                            <div className="draggable-item">
                                <p>{title}</p>
                                {renderSvg()}
                            </div>
                        </div>
                    )}
                </React.Fragment>
            )}
        </Draggable>
    );
};

export default SideModule;
