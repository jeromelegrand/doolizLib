import React from 'react';
import TextBasicModule from '../../Modules/Basics/Text/TextBasicModule';
import SeparatorBasicModule from '../../Modules/Basics/Separator/SeparatorBasicModule';
import ImageBasicModule from '../../Modules/Basics/Image/ImageBasicModule';
import AddressFormModule from '../../Modules/Forms/Address/AddressFormModule';
import IdentityFormModule from '../../Modules/Forms/Identity/IdentityFormModule';
import FileFormModule from '../../Modules/Forms/File/FileFormModule';
import RatingFormModule from '../../Modules/Forms/Rating/RatingFormModule';
import FilePluginModule from '../../Modules/Plugins/File/FilePluginModule';
import CountdownPluginModule from '../../Modules/Plugins/Countdown/CountdownPluginModule';
import ReplyPluginModule from '../../Modules/Plugins/Reply/ReplyPluginModule';
import CarpoolingPluginModule from '../../Modules/Plugins/Carpooling/CarpoolingPluginModule';
import GoldenBookPluginModule from '../../Modules/Plugins/GoldenBook/GoldenBookPluginModule';
import GuestListPluginModule from '../../Modules/Plugins/GuestList/GuestListPluginModule';
import ContactPluginModule from '../../Modules/Plugins/Contact/ContactPluginModule';
import ChoiceFormModule from '../../Modules/Forms/Choice/ChoiceFormModule';
import LongTextFormModule from '../../Modules/Forms/LongText/LongTextFormModule';
import DateFormModule from '../../Modules/Forms/Date/DateFormModule';
import CheckinPluginModule from '../../Modules/Plugins/Checkin/CheckinPluginModule';

const RenderModule = ({id, type}) => {
    const renderComponent = () => {
        switch (type) {
            case 'basic-text':
                return <TextBasicModule id={id}/>;
            case 'basic-image':
                return <ImageBasicModule id={id}/>;
            case 'basic-separator':
                return <SeparatorBasicModule id={id}/>;
            case 'form-address':
                return <AddressFormModule id={id}/>;
            case 'form-identity':
                return <IdentityFormModule id={id}/>;
            case 'form-file':
                return <FileFormModule id={id}/>;
            case 'form-rating':
                return <RatingFormModule id={id}/>;
            case 'form-choice':
                return <ChoiceFormModule id={id}/>;
            case 'form-text':
                return <LongTextFormModule id={id}/>;
            case 'form-date':
                return <DateFormModule id={id}/>;
            case 'plugin-file':
                return <FilePluginModule id={id}/>;
            case 'plugin-countdown':
                return <CountdownPluginModule id={id}/>;
            case 'plugin-reply':
                return <ReplyPluginModule id={id}/>;
            case 'plugin-carpooling':
                return <CarpoolingPluginModule id={id}/>;
            case 'plugin-golden-book':
                return <GoldenBookPluginModule id={id}/>;
            case 'plugin-guest-list':
                return <GuestListPluginModule id={id}/>;
            case 'plugin-contact':
                return <ContactPluginModule id={id}/>;
            case 'plugin-checkin':
                return <CheckinPluginModule id={id}/>;
            default:
                return 'Composant inconnu';
        }
    };

    return (
        <>
            {renderComponent()}
        </>
    );
};

export default RenderModule;
