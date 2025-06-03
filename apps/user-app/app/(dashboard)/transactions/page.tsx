import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2pTransaction } from "../../../components/P2pTransaction";


async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

async function p2pTransfer() {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
        // Handle no user ID gracefully (return empty or throw)
        return [];
      }

    const txns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        },
        include: {
          fromUser: {
            select: {
              name: true,   // select only the 'name' field of the fromUser
            }
          }
        }
    });

    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        toUser: t.toUserId,
        fromUser: t.fromUserId,
        fromUserName: t.fromUser?.name || "Unknown",  // include the name here
    }))
}


export default async function() {

    const transactions = await getOnRampTransactions();
    const p2p = await p2pTransfer();



    return <div className="w-full flex gap-10 mx-4">
                <div className=" w-1/2">
                    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">Bank Transaction</div>
                    <div className="pt-4">
                            <OnRampTransactions transactions={transactions} />
                        </div>
                </div>
                <div className="w-1/2">
                <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">P2P Transaction</div>
                    <div className="pt-4">
                            <P2pTransaction transactions={p2p} />
                        </div>
                </div>
            </div>
}