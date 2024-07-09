import React, {useMemo, useRef, useState} from 'react';
import {Button} from "./atoms/Button";
import {useTranslation} from "react-i18next";
import {Pad} from "./atoms/Pad";
import {Data} from "../data";
import {InputNumber} from "./atoms/InputNumber";


const Calculator: React.FC = () => {

    const [t] = useTranslation(["translation"]);

    const {
        vialQualities,
        waterVolumes,
        doses,
        defaultSyringeVolume,
        defaultVialQuality,
        defaultWaterVolume,
        defaultDose
    } = Data;

    const [syringeVolume, setSyringeVolume] = useState<number>(defaultSyringeVolume);
    const [vialQuality, setVialQuality] = useState<number  | 'other'>(defaultVialQuality);
    const [vialQualityOther, setVialQualityOther] = useState<number | null>(null);
    const [waterVolume, setWaterVolume] = useState<number | 'other' >(defaultWaterVolume);
    const [waterVolumeOther, setWaterVolumeOther] = useState<number | null>(null);
    const [dose, setDose] = useState<number | 'other'>(defaultDose);
    const [doseOther, setDoseOther] = useState<number | null>(null);
    const [syringeUnits, setSyringeUnits] = useState<number | null>(null);
    const progressBarEl = useRef<HTMLDivElement>(null);

    const vialQualityValue = useMemo(() => {
        if (vialQuality === 'other') {
            return vialQualityOther;
        }
        return vialQuality;
    }, [vialQuality, vialQualityOther]);

    const waterVolumeValue = useMemo(() => {
        if (waterVolume === 'other') {
            return waterVolumeOther;
        }
        return waterVolume;
    }, [waterVolume, waterVolumeOther]);

    const doseValue = useMemo(() => {
        if (dose === 'other') {
            return doseOther;
        }
        return dose;
    }, [dose, doseOther]);

    const isFormValid = useMemo(() => {
        return !!(vialQualityValue && waterVolumeValue && doseValue);
    }, [vialQualityValue,waterVolumeValue, doseValue ]);

    const progressBarWidth = useMemo(() => {
        if (!syringeUnits || !progressBarEl.current?.offsetWidth){
            return 0;
        }
        const progressBarWidth = progressBarEl.current.offsetWidth * syringeUnits / 30;

        if (progressBarWidth > progressBarEl.current.offsetWidth){
            return progressBarEl.current.offsetWidth;
        }

        return progressBarWidth;

    }, [syringeUnits,progressBarEl]);

    const calculateDose = () => {
        if (vialQualityValue && waterVolumeValue && doseValue) {
            const concentration = vialQualityValue / waterVolumeValue;
            const concentrationMcgMl = concentration * 1000;
            const volumeForDose = doseValue / concentrationMcgMl;
            const totalSyringeUnits = 100 * syringeVolume;
            setSyringeUnits((volumeForDose / syringeVolume) * totalSyringeUnits);
        }
    };

    return (
        <div className="calculator">
            <h1 className="text-2xl text-alkemya-500 mb-8 font-bold uppercase">{t('title')}</h1>

            <div className="section mb-5">
                <h2 className="text-xl text-alkemya-500 mb-4 font-semibold">{t('syringeVolume')}</h2>

                    <div className="flex justify-center space-x-4">
                        <Pad onClick={() => setSyringeVolume(0.3)}
                             selected={syringeVolume === 0.3}
                             image={`${process.env.PUBLIC_URL}/images/syringe_0.3ml.png`}
                             text={"0.3ml"}
                        />
                        <Pad onClick={() => setSyringeVolume(0.5)}
                             selected={syringeVolume === 0.5}
                             image={`${process.env.PUBLIC_URL}/images/syringe_0.5ml.png`}
                             text={"0.5ml"}
                        />
                        <Pad onClick={() => setSyringeVolume(1)}
                             selected={syringeVolume === 1}
                             image={`${process.env.PUBLIC_URL}/images/syringe_1ml.png`}
                             text={"1ml"}
                        />
                    </div>
            </div>
            <div className="section mb-5">
                <h2 className="text-xl text-alkemya-500 mb-4 font-semibold">{t('vialQuality')}</h2>
                <div className="flex justify-center space-x-1 md:space-x-4">
                    {
                        Object.entries(vialQualities)
                            .map(([_, {text, value}]) => (
                                    <div  key={value}  className={"flex flex-col justify-between items-center"}>
                                        <Button selected={vialQuality === value}
                                                onClick={() => setVialQuality(value)} text={t(text)}/>
                                    </div>
                                )
                            )

                    }
                </div>
                <div className="flex justify-center space-x-1 md:space-x-4">
                    <div className={"flex flex-col justify-between items-center"}>
                        {vialQuality === 'other' &&
                            <InputNumber value={vialQualityOther} onChange={(ev) => setVialQualityOther(
                                parseFloat(ev.target.value)
                            )} placeholder={t('enterValueInMg')}/>}
                    </div>
                </div>
            </div>
            <div className="section mb-5">
                <h2 className="text-xl text-alkemya-500 mb-4 font-semibold">{t('waterVolume')}</h2>
                <div className="flex justify-center space-x-1 md:space-x-4">
                    {
                        Object.entries(waterVolumes)
                            .map(([_, {text, value}]) => (
                                    <div key={value}  className={"flex flex-col justify-between items-center"}>
                                        <Button selected={waterVolume === value}
                                                onClick={() => setWaterVolume(value)} text={t(text)}/>
                                    </div>
                                )
                            )

                    }
                </div>
                <div className="flex justify-center space-x-1 md:space-x-4">
                    <div className={"flex flex-col justify-between items-center"}>
                        {waterVolume === 'other' &&
                            <InputNumber value={vialQualityOther}  onChange={(ev) => setWaterVolumeOther(
                                parseFloat(ev.target.value)
                            )} placeholder={t('enterValueInMl')}/>}
                    </div>
                </div>
            </div>
            <div className="section mb-5">
                <h2 className="text-xl text-alkemya-500 mb-4 font-semibold">{t('dose')}</h2>
                <div className="flex justify-center space-x-1 md:space-x-4">
                    {
                        Object.entries(doses)
                            .map(([_, {text, value}]) => (
                                    <div key={value}  className={"flex flex-col justify-between items-center"}>
                                        <Button selected={dose === value}
                                                onClick={() => setDose(value)} text={t(text)}/>
                                    </div>
                                )
                            )

                    }
                </div>
                <div className="flex justify-center space-x-1 md:space-x-4">
                    <div className={"flex flex-col justify-between items-center"}>
                        {dose === 'other' &&
                            <InputNumber value={doseOther} onChange={(ev) => setDoseOther(
                                parseFloat(ev.target.value)
                            )} placeholder={t('enterValueInMcg')}/>}
                    </div>
                </div>
            </div>
            <div className="section mb-5">
                <button type="button" disabled={!isFormValid}
                        className="calculate-btn font-colony  mt-5 p-2 text-xl uppercase text-black border border-black font-semibold bg-alkemya-500 disabled:bg-yellow-200"
                        onClick={calculateDose}>{t('calculate')}</button>
            </div>
            <div className="result mt-5 text-lg text-alkemya-500 font-semibold" id="result">
                {!syringeUnits && t('invalid_values')}
                {syringeUnits && syringeUnits && t('dose_instructions', { dose: doseValue, units: syringeUnits.toFixed(2) })}
            </div>

            <div  ref={progressBarEl}  className={"bg-no-repeat bg-contain border-0 w-full h-[60px] bg-white"} style={{
                backgroundImage: `url('${process.env.PUBLIC_URL}/images/30ml-04.png')`
            }}>
                <div id="my-progress" className={"bar border-0 bg-yellow-100 bg-opacity-50 h-full"} style={{
                    width: progressBarWidth+'px'
                }}></div>
            </div>

            {process.env.NODE_ENV === 'development' && <pre className="debug">
                ENV = {process.env.NODE_ENV}<br/>
                syringeVolume = {syringeVolume}<br/>
                vialQuality = {vialQualityValue}<br/>
                waterVolume = {waterVolumeValue}<br/>
                dose = {doseValue}<br/>
            </pre>}

        </div>

    );
};

export default Calculator;
