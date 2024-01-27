import React, { useContext, useRef } from 'react';
import '../../../styles/Learn/Lessons/ArticleMain.css';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TTSButton from '../../../../components/components/Buttons/TTSButton';
import PinyinGame from '../../../../components/components/Boxes/PinyinGame';
import ScrollToButton from '../../../../components/components/Buttons/ScrollToButton';
import FinishLessonButton from '../../../../components/components/Buttons/FinishLessonButton';
import { AuthContext } from '../../../../helpers/AuthContext';

function NumberLesson({ isVerified }: LessonProps) {
    const { authState } = useContext(AuthContext);
    const TimeRef = useRef<HTMLDivElement>(null);
    const PPFRef = useRef<HTMLDivElement>(null);
    const DatesRef = useRef<HTMLDivElement>(null);
    const DOWRef = useRef<HTMLDivElement>(null);
    const CalendarRef = useRef<HTMLDivElement>(null);
    const SeasonsRef = useRef<HTMLDivElement>(null);

    return (
        <div className="article-wrapper">
            <div className="article-title-div">
                <h1 className="article-title">Time</h1>
            </div>
            <div className="article-main-contents">
                <div className="table-of-contents-wrapper">
                    <div className="table-of-contents">
                        <p className="article-tab-header">Contents</p>
                        <ScrollToButton buttonName="Time" targetRef={TimeRef} />
                        <ScrollToButton buttonName="Past, present, and future" targetRef={PPFRef} />
                        <ScrollToButton buttonName="Days" targetRef={DatesRef} />
                        <ScrollToButton buttonName="Days of the week" targetRef={DOWRef} />
                        <ScrollToButton buttonName="Reading a calendar" targetRef={DatesRef} />
                        <ScrollToButton buttonName="Seasons" targetRef={SeasonsRef} />
                        {/*<ScrollToButton buttonName='Practice' targetRef={PracticeRef}/>*/}
                    </div>
                </div>
                <div className="article-body-wrapper">
                    <div className="article-body">
                        <p>
                            Telling time is an important aspect of any language. This lesson will go over telling time, understanding days of the week, understanding the month and year system, and
                            also the seasons.
                        </p>
                        <h3 ref={TimeRef}>Time</h3>
                        <p>
                            In China, they use a mix of the 12 and the 24 hour clock. The 12 hour format is mainly used in casual situations and the 24 hour clock is used in more formal situations,
                            such as time schedules on trains. When talking about the 12 hour clock, you can describe AM as "上午" (shàngwǔ) and PM as "下午" (xiàwǔ). Telling an exact time uses the
                            format of HOUR + "点" (diǎn) : MINUTE + "分" (fēn), Let's see some examples.
                        </p>
                        <ul>
                            <li className="cn-font">
                                下午三点十五分 <TTSButton text="下午三点十五分。" />
                            </li>
                            <p>3:15 PM</p>
                            <li className="cn-font">
                                上午十一点 <TTSButton text="上午十一点。" />
                            </li>
                            <p>11:00 AM</p>
                        </ul>
                        <p>
                            You might also see "早上" (zǎoshang) and "晚上" (wǎnshang). These are similar to "上午" and "下午", but "早上" specifically relates to the time periods between dawn until
                            noon and "晚上" relates to the time periods between early evening until night. This differs slightly from "上午" and "下午" as they are more broadly related to the concept
                            of morning and night.
                        </p>
                        <ul>
                            <li className="cn-font">
                                早上九点 <TTSButton text="早上九点。" />
                            </li>
                            <p>9:00 AM</p>
                            <li className="cn-font">
                                晚上八点四十五分 <TTSButton text="晚上八点四十五分。" />
                            </li>
                            <p>8:45 PM</p>
                        </ul>
                        <p>
                            There are a few common ways to replace some aspects of time telling, such as using "半" (bàn) to replace 0:30. "整" (zhěng) for saying an exact time. "刻" (kè) for
                            describing 15 minutes. "差" (chà) for describing some time before another.
                        </p>
                        <ul>
                            <li className="cn-font">
                                下午三点半 <TTSButton text="下午三点半。" />
                            </li>
                            <p>3:30 PM</p>
                            <li className="cn-font">
                                五点整 <TTSButton text="五点整。" />
                            </li>
                            <p>Exactly 5:00</p>
                            <li className="cn-font">
                                三点一刻 <TTSButton text="三点一刻。" />
                            </li>
                            <p>3:15</p>
                            <li className="cn-font">
                                差五分四点 <TTSButton text="差五分四点。" />
                            </li>
                            <p>3:55 (five minutes to 4:00)</p>
                        </ul>
                        <p>
                            If you are trying to describe something along the lines of "In X amount of time," you can use the following structures, "[X]分钟后" ([X] fēnzhōng hòu) In X minutes, or
                            "[X]小时后" ([X] xiǎoshí hòu) In X hours.
                        </p>
                        <ul>
                            <li className="cn-font">
                                十分钟后 <TTSButton text="十分钟后。" />
                            </li>
                            <p>In 10 minutes.</p>
                            <li className="cn-font">
                                两小时后 <TTSButton text="两小时后。" />
                            </li>
                            <p>In 2 hours.</p>
                        </ul>
                        <p>Similarly, you can use "前" (qián) to represent "X time ago".</p>
                        <ul>
                            <li className="cn-font">
                                五分钟前 <TTSButton text="五分钟前。" />
                            </li>
                            <p>5 minutes ago.</p>
                            <li className="cn-font">
                                四小时前 <TTSButton text="四小时前。" />
                            </li>
                            <p>4 hours ago.</p>
                        </ul>
                        <p>You can ask for the time like so...</p>
                        <ul>
                            <li className="cn-font">
                                现在几点了 <TTSButton text="现在几点了。" />
                            </li>
                            <p>What time is it right now?</p>
                            <li className="cn-font">
                                现在是四点四十分 <TTSButton text="现在是四点四十分。" />
                            </li>
                            <p>Right now, it is 4:40.</p>
                        </ul>
                        <h3 ref={PPFRef}>Past, present, and future</h3>
                        <p>
                            We saw that describing "now" we can use "现在" (xiànzài). There are also words to describe the past and the future. To describe the past "过去" (guòqù) is used. And to
                            describe the future "将来" (jiānglái) is used.
                        </p>
                        <ul>
                            <li className="cn-font">
                                过去的一年里，我学到了很多东西。
                                <TTSButton text="过去的一年里，我学到了很多东西。" />
                            </li>
                            <p>In the past year, I have learned a lot of things.</p>
                            <li className="cn-font">
                                我们将来会一起旅行。
                                <TTSButton text="我们将来会一起旅行。" />
                            </li>
                            <p>We will travel together in the future.</p>
                        </ul>
                        <h3 ref={DatesRef}>Days</h3>
                        <p>To describe the concept of today, you use "今天" (jīntiān). And to describe "yesterday," use 昨天 (zuótiān). And to describe "tomorrow," use "明天" (míngtiān).</p>
                        <ul>
                            <li className="cn-font">
                                昨天我去了图书馆。
                                <TTSButton text="昨天我去了图书馆。" />
                            </li>
                            <p>Yesterday, I went to the library.</p>
                            <li className="cn-font">
                                今天我会去图书馆。
                                <TTSButton text="今天我会去图书馆。" />
                            </li>
                            <p> Today, I will go to the library.</p>
                            <li>
                                明天我会去图书馆。
                                <TTSButton text="明天我会去图书馆。" />
                            </li>
                            <p> Tomorrow, I will go to the library.</p>
                        </ul>
                        <p>
                            Just like many other structures in Mandarin, you can append words like "每" (měi), "前" (qián), and "后" (hòu) to "天" to represent Everyday, The day before yesterday, and
                            They day after Tomorrow, respectively.
                        </p>

                        <h3 ref={DOWRef}>Days of the week</h3>
                        <p>
                            The days of the week are simple, to say a day of the week simple use "星期" (Xīngqī) followed by the number day of the week. The only exemption is sunday, where instead of
                            a number you use "天" (tiān) or "日" (rì)
                        </p>
                        <ul>
                            <li className="cn-font">
                                星期一 <TTSButton text="星期一。" />
                            </li>
                            <p>Monday</p>
                            <li className="cn-font">
                                星期二 <TTSButton text="星期二。" />
                            </li>
                            <p>Tuesday</p>
                            <li className="cn-font">
                                星期三 <TTSButton text="星期三。" />
                            </li>
                            <p>Wednesday</p>
                            <li className="cn-font">
                                星期四 <TTSButton text="星期四。" />
                            </li>
                            <p>Thursday</p>
                            <li className="cn-font">
                                星期五 <TTSButton text="星期五。" />
                            </li>
                            <p>Friday</p>
                            <li className="cn-font">
                                星期六 <TTSButton text="星期六。" />
                            </li>
                            <p>Saturday</p>
                            <li className="cn-font">
                                星期天 / 星期日 <TTSButton text="星期天 / 星期日。" />
                            </li>
                            <p>Sunday</p>
                        </ul>
                        <h3 ref={CalendarRef}>Reading a calendar</h3>
                        <p>
                            To read a calendar you need a few new characters. First "年" (nián), describing year. "月" (Yuè) for month. And finally "日" (rì) or "号" (hào) for day. Chinese also starts
                            from year to month to day, so we use the format YEAR + 年 + MONTH + 月 + DAY + 日/号.
                        </p>
                        <ul>
                            <li className="cn-font">
                                2050年一月十五日。
                                <TTSButton text="2050年一月十五日。" />
                            </li>
                            <p>January 15, 2050.</p>
                        </ul>
                        <p>It can be noted, that when talking about dates, like the year, arabic numerals are used commonly.</p>
                        <h3 ref={SeasonsRef}>Seasons</h3>
                        <p>
                            To describe a season, we append "天" to one of the seasonal hanzi. These are "春" (chūn) for spring, "夏" (xià) for summer, "秋" (qiū) for fall/autumn, and finally "冬"
                            (dōng) for winter.
                        </p>
                        <ul>
                            <li className="cn-font">
                                春天是一个温暖的季节。
                                <TTSButton text="春天是一个温暖的季节。" />
                            </li>
                            <p>Spring is a warm season.</p>
                            <li className="cn-font">
                                夏天的阳光很强烈。
                                <TTSButton text="夏天的阳光很强烈。" />
                            </li>
                            <p>The sunlight in summer is intense.</p>
                            <li className="cn-font">
                                秋天的树叶变得五彩斑斓。
                                <TTSButton text="秋天的树叶变得五彩斑斓。" />
                            </li>
                            <p>The leaves in autumn become colorful.</p>
                            <li className="cn-font">
                                冬天来临，天气变得寒冷。
                                <TTSButton text="冬天来临，天气变得寒冷。" />
                            </li>
                            <p>Winter arrives, and the weather becomes cold.</p>
                        </ul>

                        {isVerified && <FinishLessonButton userId={authState.id} lessonId="3" />}
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
