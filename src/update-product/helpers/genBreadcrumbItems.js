import loadDirData from "@/src/files/helpers/loadDirData"
import Link from "next/link"

const genQueryItems = (items, index, setTableData) => {
    let result = ""
    for (let i = 0; i <= index; i++) {
        result += `/${items[i]}`
    }
    return result
}

const handleItemClicked = async (e, setTableData, step, setStep) => {
    e.preventDefault()
    const newStep = e.target.attributes.href.value.split('=')[1]
    setTableData(await loadDirData(newStep))
    setStep(newStep !== undefined ? newStep : "/")
}

const genBreadcrumbItems = (query, setTableData, step, setStep) => {

    const home = "/admin/update-product"
    const querySplit = query.split("/").filter(item => item !== "")

    let result = querySplit.map((item, index) => {
        return {
            title: <Link href={`${home}/?p=${genQueryItems(querySplit, index)}`} onClick={e => handleItemClicked(e, setTableData, step, setStep)}>{item}</Link>
        }
    })

    result.unshift({ title: <Link href={`${home}`} onClick={e => handleItemClicked(e, setTableData, step, setStep)}>{"Home"}</Link> })

    return result
}

export default genBreadcrumbItems