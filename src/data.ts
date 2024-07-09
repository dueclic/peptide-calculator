type DataValue = {
    text: string;
    value: number | 'other';
}

interface VialQuality extends DataValue {}

interface WaterVolume extends DataValue {}

interface Dose extends DataValue {}

interface IData {
    vialQualities: Record<number | 'other', VialQuality>,
    waterVolumes: Record<number | 'other', WaterVolume>,
    doses: Record<number | 'other', Dose>,
    defaultVialQuality: number,
    defaultWaterVolume: number,
    defaultDose: number,
    defaultSyringeVolume: number
}
export const Data: IData  = {
    vialQualities : {
        5: {
            text: '5mg',
            value: 5
        },
        10: {
            text: '10mg',
            value: 10
        },
        15: {
            text: '15mg',
            value: 15
        },
        'other': {
            text: 'other',
            value: 'other'
        }
    },
    waterVolumes: {
        1: {
            text: '1ml',
            value: 1
        },
        2: {
            text: '2ml',
            value: 2
        },
        3: {
            text: '3ml',
            value: 3
        },
        5: {
            text: '5ml',
            value: 5
        },
        'other': {
            text: 'other',
            value: 'other'
        }
    },
    doses: {
        50: {
            text: '50mcg',
            value: 50
        },
        100: {
            text: '100mcg',
            value: 100
        },
        250: {
            text: '250mcg',
            value: 250
        },
        500: {
            text: '500mcg',
            value: 500
        },
        'other': {
            text: 'other',
            value: 'other'
        }
    },
    defaultVialQuality: 5,
    defaultSyringeVolume: 0.3,
    defaultWaterVolume: 1,
    defaultDose: 100
}
