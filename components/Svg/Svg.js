import React, {useState} from 'react';

const Svg = ({color = 'black', image, width = 30, height = 30, hoverColor, className = ''}) => {

    const [newColor, setNewColor] = useState(color);

    const renderPaths = image => {
        let paths = [];
        image.map((path, index) => {
            paths.push(<path fill={newColor} d={path} key={index} className={className}/>)
        });
        return paths;
    };

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 00 24 24"
            className={className}
            onMouseOver={() => setTimeout(() => setNewColor(hoverColor), 100)}
            onMouseLeave={() => setTimeout(() => setNewColor(color), 100)}
        >
            {renderPaths(image)}
        </svg>
    );
};

export default Svg;