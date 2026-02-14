import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { motion } from "framer-motion";

const data = [
    { name: 'Mon', value: 4200 },
    { name: 'Tue', value: 3800 },
    { name: 'Wed', value: 4500 },
    { name: 'Thu', value: 4100 },
    { name: 'Fri', value: 5200 },
    { name: 'Sat', value: 4800 },
    { name: 'Sun', value: 5100 }
];

export const PortfolioGraph: React.FC = () => {
    return (
        <div className="w-full h-[200px] mt-6">
            <div className="flex justify-between items-baseline mb-4">
                <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Fuel Sales (Last 7 Days)</div>
                    <div className="text-3xl font-bold text-white">₹3,25,321 <span className="text-xs text-emerald-500 ml-2">+12% vs last week</span></div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(t => (
                    <span key={t} className={`text-[10px] cursor-pointer transition-colors ${t === 'Fri' ? 'text-white bg-white/10 px-2 py-1 rounded' : 'text-muted-foreground hover:text-white'}`}>{t}</span>
                ))}
            </div>
        </div>
    );
};

interface AllocationItemProps {
    label: string;
    value: string;
    model: string;
    color: string;
    percent: number;
}

const AllocationItem: React.FC<AllocationItemProps> = ({ label, value, model, color, percent }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-[11px] uppercase tracking-wider">
            <span className="text-white font-medium">{label}</span>
            <span className="text-muted-foreground">{value} Ltrs</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
        <div className="text-[9px] text-muted-foreground text-right italic font-serif">
            Capacity: {model} Ltrs
        </div>
    </div>
);

export const AssetAllocation: React.FC = () => {
    return (
        <div className="space-y-6 mt-6">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest border-b border-white/10 pb-2 mb-4">Live Tank Stock</div>
            <AllocationItem label="Petrol Tank 1" value="12,500" model="20,000" color="#ef4444" percent={62.5} />
            <AllocationItem label="Diesel Tank 1" value="8,400" model="15,000" color="#3b82f6" percent={56} />
            <AllocationItem label="Diesel Tank 2" value="14,200" model="15,000" color="#3b82f6" percent={94.6} />
            <AllocationItem label="Speed/Premium" value="4,100" model="10,000" color="#fbbf24" percent={41} />
        </div>
    );
};

export const PositionTable: React.FC = () => {
    const positions = [
        { label: 'Nozzle 1 (Petrol)', value: '₹45,230' },
        { label: 'Nozzle 2 (Diesel)', value: '₹82,100' },
        { label: 'Nozzle 3 (Diesel)', value: '₹76,450' },
        { label: 'Nozzle 4 (Speed)', value: '₹12,890', sub: 'Low Flow', up: false },
        { label: 'Total Daily Sales', value: '₹2,16,670', sub: 'Target Met', up: true }
    ];

    return (
        <div className="mt-6">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-6">Daily Pump Status</div>
            <div className="flex items-center gap-2 mb-6 p-2 bg-white/5 border border-white/5 rounded-lg">
                <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 border border-black flex items-center justify-center text-[8px] text-black font-bold">P</div>
                    <div className="w-5 h-5 rounded-full bg-blue-500 border border-black flex items-center justify-center text-[8px] text-black font-bold">D</div>
                    <div className="w-5 h-5 rounded-full bg-yellow-500 border border-black flex items-center justify-center text-[8px] text-black font-bold">S</div>
                </div>
                <span className="text-[10px] text-white/60 font-semibold uppercase tracking-widest">Active Nozzles</span>
            </div>
            <div className="space-y-4">
                {positions.map((p) => (
                    <div key={p.label} className="flex justify-between items-center text-xs py-2 border-b border-white/[0.03]">
                        <span className="text-muted-foreground">{p.label}</span>
                        <div className="text-right">
                            <div className="text-white font-medium">{p.value}</div>
                            {p.sub && <div className={`text-[10px] font-bold ${p.up ? 'text-emerald-500' : 'text-red-500'}`}>{p.sub}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MarketItem: React.FC<{ label: string, value: string, change: string, up: boolean }> = ({ label, value, change, up }) => (
    <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl">
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">{label}</div>
        <div className="flex justify-between items-baseline mb-4">
            <span className="text-lg font-bold text-white">{value}</span>
            <span className={`text-[10px] ${up ? 'text-emerald-500' : 'text-red-500'}`}>{change}</span>
        </div>
        <div className="h-10 w-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={Array.from({ length: 10 }, (_, i) => ({ value: up ? 10 + Math.random() * 20 + i * 2 : 40 - Math.random() * 20 - i * 2 }))}>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={up ? "#10b981" : "#ef4444"}
                        fill={up ? "#10b98120" : "#ef444420"}
                        strokeWidth={1.5}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export const MarketSparklines: React.FC = () => {
    return (
        <div className="mt-6">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-6">System Health & Fraud</div>
            <div className="grid grid-cols-2 gap-3">
                <MarketItem label="QR vs Cash" value="98.2%" change="Match" up={true} />
                <MarketItem label="Leakage" value="0.01%" change="-12%" up={true} />
                <MarketItem label="Active Shifts" value="3" change="Running" up={true} />
                <MarketItem label="Density" value="745.2" change="Normal" up={true} />
            </div>
        </div>
    );
};
