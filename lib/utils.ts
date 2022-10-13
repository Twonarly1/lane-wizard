export const minTime = (n: any) => {
    if (!n) return
    let min = n[0]
    for (let i = 0; i < n.length; i += 1) {
        if (n[i] < min) {
            min = n[i]
        }
    }
    return min
}

export const diveScore = (n: any) => {
    if (!n) return
    // let n = time
    if (!isNaN(n) && n.length === 1) {
        return "0" + n[0] + "." + "00" //01.00
    }
    if (n.length === 2) {
        return n[0] + n[1] + ".00" //11.00
    }
    if (n.length === 3) {
        return n[0] + n[1] + n[2] + ".00" //111.00
    }
    if (n.length === 4) {
        return n[0] + n[1] + n[2] + "." + n[3] + "0" //111.40
    }
    if (n.length === 5) {
        return n[0] + n[1] + n[2] + "." + n[3] + n[4] //111.44
    }
}

export const swimTime = (time: any) => {
    if (!time) return
    if (!isNaN(time) && time.length === 1) {
        return "00:0" + time[0] + ".00" //00.01.00
    }
    if (time.length === 2) {
        return "00:" + time[0] + time[1] + ".00" //00:11.00
    }
    if (time.length === 3) {
        return "00:" + time[0] + time[1] + "." + time[2] + "0" //00:11.10
    }
    if (time.length === 4) {
        return "00:" + time[0] + time[1] + "." + time[2] + time[3] //00:11.11
    }
    if (time.length === 5) {
        return "0" + time[0] + ":" + time[1] + time[2] + "." + time[3] + time[4] //01:11.11
    }
    if (time.length === 6) {
        return time[0] + time[1] + ":" + time[2] + time[3] + "." + time[4] + time[5] //11:11.11
    }
}

export function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ")
}

export const millisecondsToMinutes = (ms: number) => {
    if (!ms) return
    let min = Math.floor(ms / 1000 / 60)
    console.log("min", min)
    let sec: any = ((ms / 1000) % 60).toFixed(2)
    console.log("sec", sec)
    const swimTime = "0" + min + ":" + sec
    return swimTime
}
