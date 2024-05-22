
type AUTH= {
    success:boolean,
    url:string,
}
const defaultResponse = {
    success:false,
    url:''
}
export const authentication = async ():Promise<AUTH> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/account/authorize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = res.json();
        return data;
        
    } catch (error) {
        return defaultResponse
    }
}
