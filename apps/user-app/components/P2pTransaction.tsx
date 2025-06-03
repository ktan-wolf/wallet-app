import { Card } from "@repo/ui/card"

export const P2pTransaction = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        toUser: number,
        fromUser: number,
        fromUserName : string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div className="border-b border-gray-400">
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                    <div className="text-slate-600 text-xs">
                        From : {t.fromUserName}
                    </div>
                    </div>
                    <div className="flex flex-col justify-center border-b border-gray-400">
                        + Rs {t.amount / 100}
                    </div>
                </div>
            )}
        </div>
    </Card>
}