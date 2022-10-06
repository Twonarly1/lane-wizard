export const minTime = (n: any) => {
    if (!n) return
    let min = n[0]
    for (let i=0; i<n.length; i+=1) {
        if (n[i] < min) {
            min = n[i]
        }
    }
return min
}