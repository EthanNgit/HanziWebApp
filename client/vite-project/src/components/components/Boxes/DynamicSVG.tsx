import React, { useState, useEffect } from 'react';

interface DynamicSvgComponentProps {
    id: string;
    active: boolean;
}

const DynamicSvg: React.FC<DynamicSvgComponentProps> = ({ id, active }) => {
    return <div></div>;
};

export default DynamicSvg;
