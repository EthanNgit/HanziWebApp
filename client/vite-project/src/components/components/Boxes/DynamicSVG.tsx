import React, { useState, useEffect } from 'react';
import '../../styles/Boxes/DynamicSVG.css';

interface DynamicSvgComponentProps {
  id: number;
  active: boolean;
}

const DynamicSvg: React.FC<DynamicSvgComponentProps> = ({ id, active }) => {
  const [svgComponent, setSvgComponent] = useState<string | null>(null);

  useEffect(() => {
    const importSvg = async () => {
      try {
        const svgModule = active ? 
         await import(`../../../assets/icons/ic_lesson_${id}_unlocked.svg`) :
         await import(`../../../assets/icons/ic_lesson_${id}_locked.svg`);
        setSvgComponent(svgModule.default);
      } catch (error) {
        console.error(`Error loading SVG with ID ${id}:`, error);
      }
    };

    importSvg();
  }, [id, active]);

  return svgComponent ? (
    <div className="svg-container">
      <img src={svgComponent} alt={`SVG ${id}`} className="svg-image" />
    </div>
  ) : null;
};

export default DynamicSvg;