import { SendCard } from "../../../components/SendCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2pTransaction } from "../../../components/P2pTransaction";

export default async function() {
    // return <div className="w-full">
    //     <SendCard />
    // </div>
    
    async function getBalance() {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            // Handle missing session or user id gracefully
            return null; // or { amount: 0, locked: 0 } if you prefer
          }

        const balance = await prisma.balance.findFirst({
            where: {
                userId: Number(session?.user?.id)
            }
        });
        return {
            amount: balance?.amount ?? 0,
            locked: balance?.locked ?? 0
        }
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


    const balance = await getBalance();
    const transactions = await p2pTransfer();

    return <div className="w-screen">
                <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold ml-4">
                    P2P Transfer
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                    <div>
                        <SendCard />
                    </div>
                    <div>
                        <BalanceCard amount={balance?.amount ?? 0} locked={balance?.locked ?? 0} />
                        <div className="pt-4">
                            <P2pTransaction transactions={transactions} />
                        </div>
                    </div>
                </div>
            </div>
}