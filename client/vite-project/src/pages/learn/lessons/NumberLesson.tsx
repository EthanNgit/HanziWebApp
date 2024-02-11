import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../../helpers/AuthContext';
import TTSButton from '../../../components/common/buttons/tts-button/TTSButton';
import ScrollToButton from '../../../components/common/buttons/scroll-to-top-button/ScrollToButton';
import FinishLessonButton from '../../../components/lessons/finish-button/FinishLessonButton';
import '../lessons/article.css';

function NumberLesson({ isVerified }: LessonProps) {
    const { authState } = useContext(AuthContext);
    const ZeroThroughTenRef = useRef<HTMLDivElement>(null);
    const HundredThroughHTRef = useRef<HTMLDivElement>(null);
    const OverTenThousandRef = useRef<HTMLDivElement>(null);
    const NegativeRef = useRef<HTMLDivElement>(null);
    const DecimalRef = useRef<HTMLDivElement>(null);
    const FractionRef = useRef<HTMLDivElement>(null);
    const PercentRef = useRef<HTMLDivElement>(null);
    const PracticeRef = useRef<HTMLDivElement>(null);
    const SlangRef = useRef<HTMLDivElement>(null);

    return (
        <div className="article-wrapper">
            <div className="article-title-div">
                <h1 className="article-title">Numbers</h1>
            </div>
            <div className="article-main-contents">
                <div className="table-of-contents-wrapper">
                    <div className="table-of-contents">
                        <p className="article-tab-header">Contents</p>
                        <ScrollToButton buttonName="0-10" targetRef={ZeroThroughTenRef} />
                        <ScrollToButton buttonName="100-10,000" targetRef={HundredThroughHTRef} />
                        <ScrollToButton buttonName="10,000+" targetRef={OverTenThousandRef} />
                        <ScrollToButton buttonName="Negative numbers" targetRef={NegativeRef} />
                        <ScrollToButton buttonName="Decimal numbers" targetRef={DecimalRef} />
                        <ScrollToButton buttonName="Fractional numbers" targetRef={FractionRef} />
                        <ScrollToButton buttonName="Percentage numbers" targetRef={PercentRef} />
                        <ScrollToButton buttonName="Slang with numbers" targetRef={SlangRef} />
                        {/*<ScrollToButton buttonName='Practice' targetRef={PracticeRef}/>*/}
                    </div>
                </div>
                <div className="article-body-wrapper">
                    <div className="article-body">
                        <p>
                            In Mandarin Chinese, pronunciation is straightforward. To add to this, in china, they still use Arabic numbers (0-9) in many situations. This lesson will cover most basic
                            applications of numbers in Mandarin. This includes counting to high numbers and types of numbers that you can see in topics such as science or math.
                        </p>
                        <h3 ref={ZeroThroughTenRef}>Counting 0 to ten</h3>
                        <ul>
                            <li className="cn-font">
                                零 (líng) <TTSButton text="零" />
                            </li>
                            <p>0</p>
                            <li className="cn-font">
                                一 (yī) <TTSButton text="一" />
                            </li>
                            <p>1</p>
                            <li className="cn-font">
                                二 (èr) <TTSButton text="二" />
                            </li>
                            <p>2</p>
                            <li className="cn-font">
                                三 (sān) <TTSButton text="三" />
                            </li>
                            <p>3</p>
                            <li className="cn-font">
                                四 (sì) <TTSButton text="四" />
                            </li>
                            <p>4</p>
                            <li className="cn-font">
                                五 (wǔ) <TTSButton text="五" />
                            </li>
                            <p>5</p>
                            <li className="cn-font">
                                六 (liù) <TTSButton text="六" />
                            </li>
                            <p>6</p>
                            <li className="cn-font">
                                七 (qī) <TTSButton text="七" />
                            </li>
                            <p>7</p>
                            <li className="cn-font">
                                八 (bā) <TTSButton text="八" />
                            </li>
                            <p>8</p>
                            <li className="cn-font">
                                九 (jiǔ) <TTSButton text="九" />
                            </li>
                            <p>9</p>
                            <li className="cn-font">
                                十 (shí) <TTSButton text="十" />
                            </li>
                            <p>10</p>
                        </ul>
                        <h3 ref={HundredThroughHTRef}>Counting to one ten thousand</h3>
                        <p>
                            <span className="highlight-max">After ten</span>, the process changes slightly. For all but "一" (yī), you would say a number in this order tens place - ten - ones place,
                            for example "九十六", meaning 96. Remember "十九" means 19, as the 一 is omitted.
                        </p>
                        <ul>
                            <li className="cn-font">
                                十八 <TTSButton text="十八" />
                            </li>
                            <p>18</p>
                            <li className="cn-font">
                                八十五 <TTSButton text="八十五" />
                            </li>
                            <p>85</p>
                            <li className="cn-font">
                                四十七 <TTSButton text="四十七" />
                            </li>
                            <p>47</p>
                        </ul>
                        <p>
                            <span className="highlight-max">One hundred</span> is not 十十, it is a new character, "百" (bǎi). So to say one hundred you say ”一百“ (yībǎi). Keep in mind though, that
                            the number two when next to 百 or higher, you should instead use 两 (liǎng). Sometimes when talking about money using 二 can be fine only with 百.
                        </p>
                        <ul>
                            <li className="cn-font">
                                两百二十一 <TTSButton text="两百二十一" />
                            </li>
                            <p>221</p>
                            <li className="cn-font">
                                七百八十九 <TTSButton text="七百八十九" />
                            </li>
                            <p>789</p>
                            <li className="cn-font">
                                九百九十九 <TTSButton text="九百九十九" />
                            </li>
                            <p>999</p>
                        </ul>
                        <p>
                            It is important to note that the number "250" has another meaning. When pronouncing two hundred fifty like this "二百五" (using 二 and omitting the 十), it also means
                            idiot. It is important to be mindful of this.
                        </p>
                        <p>
                            <span className="highlight-max">One thousand</span> similarly uses a new character, "千" (qiān). So to say one thousand you say "千百" (yīqiān). It is also important to
                            note that with numbers such as two thousand one, or in general when you when you skip numbers places, due to zeros we say "零" (líng) one time in between. with two thousand
                            one, we say "两千零一", meaning 2001.
                        </p>
                        <ul>
                            <li className="cn-font">
                                两千两百二十一 <TTSButton text="两百二十一" />
                            </li>
                            <p>2,221</p>
                            <li className="cn-font">
                                九千零九 <TTSButton text="九千零九" />
                            </li>
                            <p>9,009</p>
                        </ul>
                        <p>
                            <span className="highlight-max">Ten thousand</span> is where we can see the pattern of four emerge. In chinese after every four characters when pronouncing numbers, we use
                            a new number character and loop old ones. So we always use 十, 百, 千, but we then switch out the character after that. For ten thousand that character is "万" (wàn). That
                            means to say ten thousand you say "一万" (yīwàn). Besides this all the old rules still apply.
                        </p>
                        <ul>
                            <li className="cn-font">
                                {' '}
                                一万两千三百四十五 <TTSButton text="一万两千三百四十五" />
                            </li>
                            <p>12,345</p>
                            <li className="cn-font">
                                六万四千零二 <TTSButton text="六万四千零二" />
                            </li>
                            <p>64,002</p>
                            <li className="cn-font">
                                两万两千两百二十二 <TTSButton text="两万两千两百二十二" />
                            </li>
                            <p>22,222</p>
                        </ul>
                        <h3 ref={OverTenThousandRef}>Over ten thousand</h3>
                        <p>All numbers over ten thousand are similar, all the same rules apply, and every four characters we change to a new counter word.</p>
                        <ul>
                            <li className="cn-font">
                                两十两万两千两百二十二 <TTSButton text="两十两万两千两百二十二" />
                            </li>
                            <p>222,222</p>
                            <li className="cn-font">
                                八千七百六十五万四千三百二十一 <TTSButton text="八千七百六十五万四千三百二十一" />
                            </li>
                            <p>87,654,321</p>
                        </ul>
                        <p>We can see the pattern that happens, after the fourth counter word we wrap back around to the first three counter words 十, 百, 千.</p>
                        <p>Here are some more counter words that you might see, although there are more, its uncommon to see it outside of science.</p>
                        <ul>
                            <li className="cn-font">
                                亿 (yì)
                                <TTSButton text="亿" />
                            </li>
                            <p>100,000,000</p>
                            <li className="cn-font">
                                兆 (zhào)
                                <TTSButton text="兆" />
                            </li>
                            <p>1,000,000,000,000</p>
                        </ul>
                        <h3 ref={NegativeRef}>expressing negatives</h3>
                        <p>
                            <span className="highlight-max">Negative numbers</span> are simple, you can just add the character "负" (fù), then say the number like normal.
                        </p>
                        <ul>
                            <li className="cn-font">
                                负六
                                <TTSButton text="负六" />
                            </li>
                            <p>-6</p>
                            <li className="cn-font">
                                负十八
                                <TTSButton text="负十八" />
                            </li>
                            <p>-18</p>
                        </ul>
                        <h3 ref={DecimalRef}>expressing decimals</h3>
                        <p>
                            <span className="highlight-max">Decimal numbers</span> are also simple, you can just add the character "点" (diǎn) in between the number and the decimal. Keep in mind
                            though, that you only pronounce the number as normal, but the decimal numbers are pronounced individually. For example, the number "11.55" is "十一点五五", and literal
                            english you would say like eleven point five five.
                        </p>
                        <ul>
                            <li className="cn-font">
                                两百零五点二零五
                                <TTSButton text="两百零五点二零五" />
                            </li>
                            <p>205.205</p>
                            <li className="cn-font">
                                {' '}
                                一百二十三点四五六
                                <TTSButton text=" 一百二十三点四五六" />
                            </li>
                            <p>123.456</p>
                        </ul>
                        <h3 ref={FractionRef}>expressing fractions</h3>
                        <p>
                            <span className="highlight-max">Fractions</span> are a bit different than in english. In mandarin you state the denominator then "分之" (fēn zhī), then the numerator.
                            Opposed to the english numerator over denominator. Other than that it keeps the same principles for normal numbers.
                        </p>
                        <ul>
                            <li className="cn-font">
                                五分之一
                                <TTSButton text="五分之一" />
                            </li>
                            <p>1/5</p>
                            <li className="cn-font">
                                五千六百七十八分之一千二百三十四 <TTSButton text="五千六百七十八分之一千二百三十四 " />
                            </li>
                            <p>1234/5678</p>
                        </ul>
                        <h3 ref={PercentRef}>Expressing percentages with numbers</h3>
                        <p>
                            <span className="highlight-max">Percentages</span> use a similar structure to fractions, where you say "百分之" (bǎifēnzhī). The difference than english is that in mandarin
                            you say percent then number, instead of percent then number. So to say five percent you say "百分之五" (bǎifēnzhī wǔ), literally percent five. Other than that the same
                            rules apply to the number.
                        </p>
                        <ul>
                            <li className="cn-font">
                                百分之二十七
                                <TTSButton text="百分之二十七" />
                            </li>
                            <p>27%</p>
                            <li className="cn-font">
                                百分之九百九十九万九千九百九十九
                                <TTSButton text="百分之九百九十九万九千九百九十九" />
                            </li>
                            <p>9999999%</p>
                        </ul>
                        {/*<h3 ref={PracticeRef}>Practice</h3>*/}
                        <h3 ref={SlangRef}>Common slang that uses numbers</h3>
                        <p>There are a handful of slang you might come across in China or other Mandarin Speaking countries. Here are a few of the most common slang.</p>
                        <ul>
                            <li className="cn-font">
                                五二零 <TTSButton text="五二零" />
                            </li>
                            <p>520 sounds like "wǒ ài nǐ" in Mandarin, so it is used to express love.</p>
                            <li className="cn-font">
                                八八
                                <TTSButton text="八八" />
                            </li>
                            <p>88 sounds like "bye-bye" in English, so it is used to say goodbye.</p>
                            <li className="cn-font">
                                五五五
                                <TTSButton text="五五五" />
                            </li>
                            <p>555 sounds like the sound "wuwuwu", so it is used to express crying.</p>
                            <li className="cn-font">
                                六六六
                                <TTSButton text="六六六" />
                            </li>
                            <p>666 is used to express something smooth or cool.</p>
                            <li className="cn-font">
                                七七七
                                <TTSButton text="七七七" />
                            </li>
                            <p>777 is used to express something smooth or cool in Taiwan (as a better 666).</p>
                        </ul>

                        {isVerified && <FinishLessonButton userId={authState.id} lessonId="2" />}
                    </div>
                </div>
                <div className="article-ads-wrapper">
                    <div className="article-ads"></div>
                </div>
            </div>
        </div>
    );
}

export default NumberLesson;
