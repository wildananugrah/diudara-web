import Cookies from "universal-cookie";

const deleteFilesOrFolder = async (currentRecord) => {

    const userToken = new Cookies().get('token').token

    const { path, isDirectory } = currentRecord.info;
    const url = isDirectory
        ? `${process.env.NEXT_PUBLIC_UPLOAD_HOST}/folder?p=${path}`
        : `${process.env.NEXT_PUBLIC_UPLOAD_HOST}/file?p=${path}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        method: "DELETE",
    });
    return response
}

export default deleteFilesOrFolder