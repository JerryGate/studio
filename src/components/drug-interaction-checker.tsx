
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { X, Plus, Beaker, Loader2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkDrugInteractions, DrugInteractionOutput } from '@/ai/flows/drug-interaction-checker';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const severityConfig = {
    High: {
        icon: AlertTriangle,
        color: 'text-destructive',
        bgColor: 'bg-destructive/10',
        borderColor: 'border-destructive/20',
        title: 'High Severity Interaction'
    },
    Moderate: {
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        title: 'Moderate Interaction'
    },
    Low: {
        icon: Info,
        color: 'text-blue-600',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        title: 'Low Interaction'
    },
    None: {
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        title: 'No Interaction Found'
    }
};

export function DrugInteractionChecker() {
    const [drugs, setDrugs] = useState<string[]>(['', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<DrugInteractionOutput | null>(null);
    const { toast } = useToast();

    const handleDrugChange = (index: number, value: string) => {
        const newDrugs = [...drugs];
        newDrugs[index] = value;
        setDrugs(newDrugs);
    };

    const addDrugInput = () => {
        if (drugs.length < 10) {
            setDrugs([...drugs, '']);
        } else {
            toast({
                title: 'Limit Reached',
                description: 'You can check up to 10 drugs at a time.',
                variant: 'destructive',
            });
        }
    };

    const handleCheckInteractions = async () => {
        const validDrugs = drugs.map(d => d.trim()).filter(d => d);
        if (validDrugs.length < 2) {
            toast({
                title: 'Insufficient Input',
                description: 'Please enter at least two drugs to check for interactions.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const response = await checkDrugInteractions({ drugs: validDrugs });
            setResult(response);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Beaker className="h-5 w-5 text-primary" />
                    Drug Interaction Checker
                </CardTitle>
                <CardDescription>
                    Enter two or more drugs to check for potential interactions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {drugs.map((drug, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                type="text"
                                placeholder={`Drug ${index + 1}`}
                                value={drug}
                                onChange={(e) => handleDrugChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addDrugInput} className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add Drug
                </Button>
                <Button
                    type="button"
                    onClick={handleCheckInteractions}
                    disabled={isLoading}
                    className="w-full mt-4"
                >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Beaker className="mr-2 h-4 w-4" />}
                    Check Interactions
                </Button>

                {result && (
                    <motion.div 
                        className="mt-6 space-y-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h4 className="font-semibold text-lg">Results:</h4>
                        <Alert className={cn(
                            severityConfig[result.interactions.length > 0 ? result.interactions[0].severity : 'None'].bgColor,
                            severityConfig[result.interactions.length > 0 ? result.interactions[0].severity : 'None'].borderColor
                        )}>
                            <AlertTitle className="font-bold">Summary</AlertTitle>
                            <AlertDescription>{result.summary}</AlertDescription>
                        </Alert>
                        <AnimatePresence>
                            {result.interactions.map((interaction, index) => {
                                const config = severityConfig[interaction.severity];
                                const Icon = config.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                    >
                                        <Alert className={cn(config.bgColor, config.borderColor)}>
                                            <Icon className={cn("h-4 w-4", config.color)} />
                                            <AlertTitle className={cn("font-bold", config.color)}>
                                                {config.title}
                                            </AlertTitle>
                                            <AlertDescription>
                                                <p className="font-semibold mt-2">Description:</p>
                                                <p>{interaction.description}</p>
                                                <p className="font-semibold mt-2">Recommendation:</p>
                                                <p>{interaction.recommendation}</p>
                                            </AlertDescription>
                                        </Alert>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
}
