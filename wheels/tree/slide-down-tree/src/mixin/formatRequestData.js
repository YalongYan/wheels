export default {
    methods: {
        formatRequestData (obj) {
            let result = {
                v: this.v,
                qzid: this.qzid,
                page: this.page,
                count: this.count,
                breadcrumbs: this.breadcrumbs,
                parent_id: this.parent_id,
                dept_type: this.dept_type,
                is_org: this.is_org,
                other: this.other
            }
            if(obj && (JSON.stringify(obj) != "{}")) {
                Object.assign(result, obj);
            }
            return result        
        }
    }
}