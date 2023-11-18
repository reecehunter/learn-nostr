export default ({ json, className }) => {
    return (
        <div className={`${className} p-2 rounded-sm overflow-auto bg-[#403c3c]`}>
            <pre>
                {JSON.stringify(json, null, 2)}
            </pre>
        </div>
    )
}