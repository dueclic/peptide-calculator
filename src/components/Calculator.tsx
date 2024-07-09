import React, {useEffect, useMemo, useState} from 'react';
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
    const [result, setResult] = useState<string>('');

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

    const calculateDose = () => {
        if (vialQualityValue && waterVolumeValue && doseValue) {
            const concentration = vialQualityValue / waterVolumeValue;
            const concentrationMcgMl = concentration * 1000;
            const volumeForDose = doseValue / concentrationMcgMl;
            const totalSyringeUnits = 100 * syringeVolume; // Ad esempio, 0.3 ml -> 30 unità, 1 ml -> 100 unità
            const syringeUnits = (volumeForDose / syringeVolume) * totalSyringeUnits;
            if (syringeUnits > totalSyringeUnits) {
                setResult(t('calculated_volume_exceeds'));
            } else {
                setResult(t('dose_instructions', { dose: doseValue, units: syringeUnits.toFixed(2) }));
            }
        } else {
            setResult(t('invalid_values'));
        }
    };

    return (
        <div className="calculator">
            <h1 className="text-2xl text-yellow-500 mb-8 font-bold uppercase">{t('title')}</h1>

            <div className="section mb-5">
                <h2 className="text-xl text-yellow-500 mb-4 font-semibold">{t('syringeVolume')}</h2>

                <div className="container mx-auto">
                    <div className="flex space-x-4">
                        <Pad onClick={() => setSyringeVolume(0.3)}
                             selected={syringeVolume === 0.3}
                             image={"/images/syringe_0.3ml.png"}
                             text={"0.3ml"}
                        />
                        <Pad onClick={() => setSyringeVolume(0.5)}
                             selected={syringeVolume === 0.5}
                             image={"/images/syringe_0.5ml.png"}
                             text={"0.5ml"}
                        />
                        <Pad onClick={() => setSyringeVolume(1)}
                             selected={syringeVolume === 1}
                             image={"/images/syringe_1ml.png"}
                             text={"1ml"}
                        />
                    </div>
                </div>

            </div>
            <div className="section mb-5">
                <h2 className="text-xl text-yellow-500 mb-4 font-semibold">{t('vialQuality')}</h2>
                <div className="flex justify-center space-x-4">
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
                <div className="flex justify-center space-x-4">
                    <div className={"flex flex-col justify-between items-center"}>
                        {vialQuality === 'other' &&
                            <InputNumber value={vialQualityOther} onChange={(ev) => setVialQualityOther(
                                parseFloat(ev.target.value)
                            )} placeholder={t('enterValueInMg')}/>}
                    </div>
                </div>
            </div>
            <div className="section mb-5">
                <h2 className="text-xl text-yellow-500 mb-4 font-semibold">{t('waterVolume')}</h2>
                <div className="flex justify-center space-x-4">
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
                <div className="flex justify-center space-x-4">
                    <div className={"flex flex-col justify-between items-center"}>
                        {waterVolume === 'other' &&
                            <InputNumber value={vialQualityOther}  onChange={(ev) => setWaterVolumeOther(
                                parseFloat(ev.target.value)
                            )} placeholder={t('enterValueInMl')}/>}
                    </div>
                </div>
            </div>
            <div className="section mb-5">
                <h2 className="text-xl text-yellow-500 mb-4 font-semibold">{t('dose')}</h2>
                <div className="flex justify-center space-x-4">
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
                <div className="flex justify-center space-x-4">
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
                        className="calculate-btn mt-5 p-4 text-xl rounded-md font-semibold bg-orange-600 disabled:bg-orange-200 hover:bg-orange-700"
                        onClick={calculateDose}>{t('calculate')}</button>
            </div>
            <div className="result mt-5 text-lg text-yellow-500 font-semibold" id="result">{result}</div>

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
