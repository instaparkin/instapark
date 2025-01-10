import template from "lodash.template";

type ApiEndpointType = {
    url: string;
    params: Record<string, string>
}

export const apiEndpoint = ({ url, params }: ApiEndpointType) => {
    const compiled = template(url);
    return  compiled(params);
}
