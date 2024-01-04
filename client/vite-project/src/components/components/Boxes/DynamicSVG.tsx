import React, { useState, useEffect } from 'react';

interface DynamicSvgComponentProps {
  id: number;
  active: boolean;
}

const DynamicSvg: React.FC<DynamicSvgComponentProps> = ({ id, active }) => {
  const [svgComponent, setSvgComponent] = useState<string | null>(null);

  const importSvg = async () => {
    try {
      const svgModule = active 
      ? await import(`../../../assets/icons/ic_lesson_${id}_unlocked.svg`) 
      : await import(`../../../assets/icons/ic_lesson_${id}_locked.svg`);
      
      setSvgComponent(svgModule.default);
    } catch (error) {
      console.error(`Error loading SVG with ID ${id}:`, error);
    }
  };

  useEffect(() => {
    importSvg();
  }, [id, active]);

  return svgComponent ? (
    <div className="svg-container">
      <style>
        {`
          @import url(../../../global/variables.css);

          .parent-container {
              position: relative; 
            }
            
            .svg-container {
              position: absolute;
              top: 0;
              right: 0;
              margin: 10px;
            }
            
            .svg-image {
              width: 32px; 
              height: 32px; 
              color: var(--brand-one);
            }
        `}
      </style>
      <img src={svgComponent} alt={`SVG ${id}`} className="svg-image" />
    </div>
  ) : null;
};

export default DynamicSvg;