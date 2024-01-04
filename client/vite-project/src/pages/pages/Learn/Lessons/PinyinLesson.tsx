import React, { useContext, useRef } from 'react'
import '../../../styles/Learn/Lessons/ArticleMain.css';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TTSButton from '../../../../components/components/Buttons/TTSButton';
import PinyinGame from '../../../../components/components/Boxes/PinyinGame';
import ScrollToButton from '../../../../components/components/Buttons/ScrollToButton';
import FinishLessonButton from '../../../../components/components/Buttons/FinishLessonButton';
import { AuthContext } from '../../../../helpers/AuthContext';



function PinyinLesson({isVerified} : LessonProps) {
  const { authState } = useContext(AuthContext);
  const TonesRef = useRef<HTMLDivElement>(null);
  const SandhiRef = useRef<HTMLDivElement>(null);
  const ExamplesRef = useRef<HTMLDivElement>(null);
  const PracticeRef = useRef<HTMLDivElement>(null);
  const MoreExamplesRef = useRef<HTMLDivElement>(null);
  const ResourcesRef = useRef<HTMLDivElement>(null);

  return (
    <div className='article-wrapper'>
      <div className="article-title-div">
        <h1 className='article-title'>Pinyin</h1>
      </div>
      <div className="article-main-contents">
        <div className="table-of-contents-wrapper">
          <div className="table-of-contents">
            <p className='article-tab-header'>Contents</p>
            <ScrollToButton buttonName='Tones' targetRef={TonesRef}/>
            <ScrollToButton buttonName='Sandhi' targetRef={TonesRef}/>
            <ScrollToButton buttonName='Examples' targetRef={ExamplesRef}/>
            <ScrollToButton buttonName='Practice' targetRef={PracticeRef}/>
            <ScrollToButton buttonName='MoreExamples' targetRef={MoreExamplesRef}/>
            <ScrollToButton buttonName='Resources' targetRef={ResourcesRef}/>
          </div>
        </div>
        <div className="article-body-wrapper">
          <div className="article-body">
            <p>
              Pinyin is a Romanization system that converts Chinese characters into the Latin alphabet, specifically designed for Mandarin Chinese. 
              It employs Roman letters and diacritic marks to denote the pronunciation of words, making it an invaluable tool for learners and a bridge between the logographic Chinese script and the Latin alphabet.
            </p>
            <p>
              Widely used in education, dictionaries, and language instruction, Pinyin facilitates accurate pronunciation for both native and non-native speakers. 
              Beyond learning purposes, it plays a crucial role in modern communication, aiding in typing Chinese characters on digital devices. 
              Pinyin's adaptability extends to linguistic research, enabling scholars to analyze Mandarin's phonetic nuances. 
              Ultimately, Pinyin stands as a key element in making Mandarin Chinese accessible and navigable for learners and users alike.
            </p>
            <h3 ref={TonesRef}>Tones</h3>
            <p>
              Pinyin incorporates four distinct tones to convey variations in the pitch or intonation of Mandarin Chinese. 
              Each tone corresponds to a different pitch contour and carries a unique meaning, significantly influencing the interpretation of words. 
              The four tones are denoted by diacritic marks, which are essential for accurate pronunciation.
            </p>
            <p>
              The first tone is a high and level pitch (e.g., mā), the second tone rises (má), the third tone falls and then rises (mǎ), while the fourth tone is a sharp fall in pitch (mà).
              Additionally, there is a neutral tone, often considered a fifth tone, indicated by the absence of a diacritic mark (ma).
              Mastering these tonal distinctions is crucial in Mandarin pronunciation, as subtle variations can lead to different meanings. 
              Whether in language education, communication, or research, understanding and effectively employing the four tones in Pinyin is foundational to proficient Mandarin language usage.
            </p>
            <h3 ref={SandhiRef}>Sandhi</h3>
            <p>
            In Mandarin, Pinyin's sandhi introduces a new transformation, most notably observed in the dance of the third tone. 
            Traditionally a falling-rising tone, the third tone adapts when meeting its counterpart, transitioning into a second tone.
            This can be seen in words like "你好" (nǐ hǎo) becoming "ní hǎo," exemplifies sandhi's ability to maintain linguistic harmony.
            </p>
            <p>
            Beyond this, Pinyin's sandhi repertoire includes tone neutrality. 
            In select instances, tones find resolution through the neutral tone (轻声, qīngshēng). 
            This unmarked tone, exemplified in words like "妈妈" (māma) pronounced as "máma," serves as a bridge between tonal disparities, especially in unstressed syllables.
            </p>

            <h3 ref={ExamplesRef}>Examples</h3>
            <ul>
              <li className='cn-font'>我的<span className='highlight'>妈妈</span>很善良。(mā) <TTSButton text='我的妈妈很善良。'/></li>
              <p>Wǒ de <span className='highlight'>māmā</span> hěn shànliáng.</p>
              <p>My <span className='highlight'>mom</span> is very kind.</p>
              <li className='cn-font'>这件衣服很<span className='highlight'>麻</span> (má) <TTSButton text='这件衣服很麻'/></li>
              <p>Zhè jiàn yīfu hěn <span className='highlight'>má</span>.</p>
              <p>This clothing is very <span className='highlight'>itchy.</span></p>
              <li className='cn-font'>在农场里有一匹<span className='highlight'>马</span>。(mǎ) <TTSButton text='在农场里有一匹马'/></li>
              <p>Zài nóngchǎng lǐ yǒu yī pǐ <span className='highlight'>mǎ.</span></p>
              <p>There is a <span className='highlight'>horse</span> on the farm.</p>
              <li className='cn-font'>请不要<span className='highlight'>骂</span>小狗。(mà) <TTSButton text='请不要骂小狗。'/></li>
              <p>Qǐng bùyào <span className='highlight'>mà</span> xiǎo gǒu.</p>
              <p>Please don't <span className='highlight'>scold</span> the puppy.</p>
              <li className='cn-font'><span className='highlight'>妈骂</span>小孩儿，说衣服很<span className='highlight'>麻</span>，小狗追着<span className='highlight'>马</span>跑。 (all) <TTSButton text='妈骂小孩儿，说衣服很麻，小狗追着马跑。'/></li>
              <p><span className='highlight'>Mā mà</span> xiǎo hái er, shuō yīfu hěn <span className='highlight'>má</span>, xiǎo gǒu zhuī zhe <span className='highlight'>mǎ</span> pǎo.</p>
              <p><span className='highlight'>Mom scolds</span> the child, saying the clothes are <span className='highlight'>itchy</span>, and the puppy is chasing the <span className='highlight'>horse</span>.</p>
            </ul>
            <h3 ref={PracticeRef}>Practice</h3>
            <p>
              Listen to the sound and click the box with the correct tone. 
            </p>
            <PinyinGame/>
            <p>
              Learning to listen for tonal differences is one of the hardest parts of learning Mandarin. It would not be abnormal for you to play the game for days straight.
            </p>

            <h3 ref={MoreExamplesRef}>The Lion-Eating Poet in the Stone Den</h3>
            <p>
              This poem was created in the 1930s by Yuen Ren Choa. It contains only one sound "shi", but using multiple tones it means different things.
              Don't worry if you don't understand it though, even natives have a hard time understanding it without reading it.
            </p>
            <div className="article-center-div">
              <h4>《施氏食狮史》<TTSButton text='《施氏食狮史》石室诗士施氏，嗜狮，誓食十狮。氏时时适市视狮。
              十时，适十狮适市。是时，适施氏适市。氏视是十狮，恃矢势，使是十狮逝世。氏拾是十狮尸，适石室。
              石室湿，氏使侍拭石室。石室拭，氏始试食是十狮。食时，始识是十狮尸，实十石狮尸。试释是事。'/></h4>
              <p>石室诗士施氏，嗜狮，誓食十狮。</p>
              <p>氏时时适市视狮。</p>
              <p>十时，适十狮适市。</p>
              <p>是时，适施氏适市。</p>
              <p>氏视是十狮，恃矢势，使是十狮逝世。</p>
              <p>氏拾是十狮尸，适石室。</p>
              <p>石室湿，氏使侍拭石室。</p>
              <p>石室拭，氏始试食是十狮。</p>
              <p>食时，始识是十狮尸，实十石狮尸。</p>
              <p>试释是事。</p>
            </div>
            <div className="article-center-div">
              <h4> Shī Shì shí shī shǐ </h4>
              <p>Shíshì shīshì Shī Shì, shì shī, shì shí shí shī.</p>
              <p>Shì shíshí shì shì shì shī.</p>
              <p>Shí shí, shì shí shī shì shì.</p>
              <p>Shì shí, shì Shī Shì shì shì.</p>
              <p>Shì shì shì shí shī, shì shǐ shì, shǐ shì shí shī shìshì.</p>
              <p>Shì shí shì shí shī shī, shì shíshì.。</p>
              <p>Shíshì shī, Shì shǐ shì shì shíshì.</p>
              <p>Shíshì shì, Shì shǐ shì shí shì shí shī.</p>
              <p>Shí shí, shǐ shí shì shí shī shī, shí shí shí shī shī. </p>
              <p>Shì shì shì shì.。</p>
            </div>
            
            <h3 ref={ResourcesRef}>Resources</h3>
            <p>
              Here are some more resources that can are useful for mastering pinyin.
            </p>
            <a href="https://yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table" target="_blank" rel="noopener noreferrer" className='article-link'><h4>Interactive pinyin chart</h4></a>

            {isVerified && <FinishLessonButton userId={ authState.id }lessonId='1'/>}
          </div>
        </div>
        <div className="article-ads-wrapper">
          <div className="article-ads">
            
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default PinyinLesson