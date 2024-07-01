import AppError from '../../common/utils/appError.js'
import { catchAsync } from '../../common/utils/errorHandler.js'
import geoip from 'geoip-lite'
import axios from 'axios'
import { ENVIRONMENT } from '../../common/config/environment.js'
import requestIp from 'request-ip'

const getUserIp = (req) => {
    let ipAddress = requestIp.getClientIp(req)

    if (ipAddress.includes('::ffff:')) {
        ipAddress = ipAddress.replace('::ffff:', '')
    }

    console.log('ipAddress', ipAddress)

    return ipAddress ?? '104.28.220.44'
}

const getGeoLocation = async (ip) => {
    const geo = await geoip.lookup(ip)
    console.log('geo', geo)

    const { city, region, country } = geo

    return {
        city,
        region,
        country,
    }
}

const getTemperatureInCelsius = async (city) => {
    try {
        const res = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=${ENVIRONMENT.OPEN_WEATHER.API_KEY}&q=${city}&aqi=no`
        )

        console.log('res axios', res?.data)

        if (!res?.status === 200 || !res?.data?.current?.temp_c) {
            throw new AppError(
                'Sorry we are having network issue , please try again',
                400
            )
        }

        return res.data.current.temp_c
    } catch (error) {
        throw new AppError(
            'Sorry we are having network issue , please try again',
            400
        )
    }
}

export const getHello = catchAsync(async (req, res) => {
    const { visitor_name } = req.query

    const ip = getUserIp(req)
    const { city } = await getGeoLocation(ip)
    const temperature = await getTemperatureInCelsius(city)

    console.log({ ip, city, temperature })

    let requesterCity = city ?? 'New York'

    if (!ip || !city) {
        throw new AppError(
            'Sorry we are having network issue , please try again',
            400
        )
    }

    const data = {
        client_ip: ip, // The IP address of the requester
        location: requesterCity, // The city of the requester
        greeting: `Hello, ${visitor_name ?? 'Visitor'}!, the temperature is ${temperature} degrees Celsius in ${requesterCity}`,
    }

    return res.status(200).json(data)
})
