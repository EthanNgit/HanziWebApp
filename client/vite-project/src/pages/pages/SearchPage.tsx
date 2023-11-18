import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/SearchPage.css'
import { useOutsideClickAlert } from '../../hooks/outsideClickAlert';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Validator } from '../../global/Ts/Validator';
import ToTopButton from '../../components/components/Buttons/ToTopButton';

interface hanziRow {
  id: number,
  simplified: string,
  traditional: string,
  pinyin: string,
  simplifiedStrokeCount: string,
  traditionalStrokeCount: string,
  hskLevel: number, 
  characterCount: number, 
  category: string,
}

function SearchPage() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const { visible: optionsVisible, setVisible: setOptionsVisible, ref: optionsRef } = useOutsideClickAlert(false);
  const [items, setItems] = useState<hanziRow[]>([]);
  const [val, setVal] = useState("");
  const validator = new Validator();
  const searchRef = useRef<HTMLDivElement>(null);

  const scrollToKey = (key: number) => {
    const element = searchRef.current?.querySelector(`[data-key="${key}"]`);

    if (element) {
      element.classList.add('highlight');

      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
      });

      setTimeout(() => {
        element.classList.remove('highlight');
      }, 2000);
    }
  };

  useEffect(() => {
    if (authState.status == false) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:3001/api/hanzi/get").then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setItems(response.data);
      }
    });
  }, []);

  const searchHanzi = (e: any) => {
    if (e.key === "Enter") {
      const foundItem = items.find((item) => {
        if (item.simplified === val || item.traditional === val || validator.normalizeString(item.pinyin) === val || item.pinyin === val) {
          return true;
        }
      });

      if (foundItem) {
        scrollToKey(foundItem.id);
        console.log(foundItem.id);
      }
    }
  };

  return (
    <div className='search-page-contents'>
        <div className='search-search-box'>
            <input type='text' placeholder='enter hanzi or pinyin...' onKeyDown={ searchHanzi } onChange={e => {
              setVal(e.target.value);
            }}/>
            <button className='search-search-settings-btn' onClick={() => setOptionsVisible(optionsVisible => !optionsVisible)}>Options <FontAwesomeIcon icon={faCaretDown} /></button>
        </div>

        {
            optionsVisible && (
              <div className="hsk-levels-wrap" ref={optionsRef}>
                <div className="hsk-levels">
                  <form>
                    <label>
                      <input type="radio" name="hsk-level" value="HSK LEVEL" defaultChecked/>
                      All HSK <span className="custom-radio"></span>
                    </label>
                    <h1>Filter HSK</h1>
                    <label>
                      <input type="radio" name="hsk-level" value="HSK 1" />
                      HSK 1 <span className="custom-radio"></span> 
                    </label>
                    <label>
                      <input type="radio" name="hsk-level" value="HSK 2" />
                      HSK 2 <span className="custom-radio"></span> 
                    </label>
                    <label>
                      <input type="radio" name="hsk-level" value="HSK 3" />
                      HSK 3 <span className="custom-radio"></span> 
                    </label>
                    <label>
                      <input type="radio" name="hsk-level" value="HSK 4" />
                      HSK 4 <span className="custom-radio"></span>
                    </label>
                    <label>
                      <input type="radio" name="hsk-level" value="HSK 5" />
                      HSK 5 <span className="custom-radio"></span> 
                    </label>
                    <label>
                      <input type="radio" name="hsk-level" value="HSK 6" />
                      HSK 6 <span className="custom-radio"></span>
                    </label>
                  </form>
                </div>
            </div>)
      }

      <div className="outer-grid-wrapper">
        <h1>HSK 1</h1>
        <div className='search-grid-wrapper'>
              <div className="search-grid-container" ref={searchRef}>
                {items.map((item) => (
                  <div key={item.id} className="search-grid-item" data-key={item.id} onClick={() => {navigate(`/hanzi/${item.simplified}`)}}>
                    {item.simplified}
                    {item.traditional != null ? " / " + item.traditional : ""}
                    <p>{item.pinyin}</p>
                  </div>
                ))}
              </div>
            </div>
      </div>
      <ToTopButton/>
    </div>
  )
}

export default SearchPage