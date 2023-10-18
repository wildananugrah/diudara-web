import Link from "next/link"
import loadDirData from "./loadDirData"

const genQueryItems = (items, index, setTableData) => {
    let result = ""
    for (let i = 0; i <= index; i++) {
        result += `/${items[i]}`
    }
    return result
}

const handleItemClicked = async (e, setTableData) => {
    setTableData(await loadDirData(e.target.attributes.href.value.split('=')[1]))
}

const genBreadcrumbItems = (query, setTableData) => {

    const home = "/admin/files"
    const querySplit = query.split("/").filter(item => item !== "")

    let result = querySplit.map((item, index) => {
        return {
            title: <Link href={`${home}/?p=${genQueryItems(querySplit, index)}`} onClick={e => handleItemClicked(e, setTableData)}>{item}</Link>
        }
    })

    result.unshift({ title: <Link href={`${home}`} onClick={e => handleItemClicked(e, setTableData)}>{"Home"}</Link> })

    return result
}

export default genBreadcrumbItems