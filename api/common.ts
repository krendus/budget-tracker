import axios from "./axios";

type OptionType = "education_levels" | "how_did_you_hear" | "education_levels"

export const getOptions = (type: OptionType) => {
    return axios.get(`/common/options?type=${type}`)
}

export const getInstitutions = () => {
    return axios.get(`/common/institutions`)
}
