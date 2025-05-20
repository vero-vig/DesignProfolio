import React from 'react';
import {
  Accessibility,
  Ear, EarOff,
  Scale, 
  Shield, ShieldAlert,
  Users, Users2,
  Pencil, PenTool,
  Code,
  Database,
  Puzzle,
  Lock,
  Zap,
  Clock,
  BarChart, BarChart2, BarChart3, BarChart4,
  LineChart,
  Target,
  Layout,
  MessageSquare, MessagesSquare,
  Repeat,
  ListChecks,
  Laptop, 
  UserCheck
} from 'lucide-react';

interface IconMapperProps {
  iconName: string;
  className?: string;
}

export const IconMapper: React.FC<IconMapperProps> = ({ iconName, className = "h-6 w-6" }) => {
  // Handle empty icon names
  if (!iconName) {
    return <Target className={className} />;
  }

  const name = iconName.toLowerCase();

  // Map icon names to Lucide React components
  switch (name) {
    // Accessibility icons
    case 'accessibility':
      return <Accessibility className={className} />;
    
    // Hearing related icons
    case 'ear':
      return <Ear className={className} />;
    case 'ear-deaf':
    case 'ear-off':
      return <EarOff className={className} />;
    
    // Scale/Balance icons
    case 'scale':
    case 'balance':
      return <Scale className={className} />;
    
    // Shield/Security icons
    case 'shield':
    case 'shield-alt':
      return <Shield className={className} />;
    case 'shield-alert':
      return <ShieldAlert className={className} />;
    
    // User/People icons
    case 'users':
      return <Users className={className} />;
    case 'users-2':
    case 'users-round':
    case 'multiple-users':
      return <Users2 className={className} />;
    
    // Design tools icons
    case 'pen':
    case 'pencil':
      return <Pencil className={className} />;
    case 'pen-tool':
    case 'design':
    case 'design-tools':
      return <PenTool className={className} />;
    
    // Code/Development icons
    case 'code':
    case 'development':
      return <Code className={className} />;
    
    // Data icons
    case 'database':
    case 'data':
      return <Database className={className} />;
    
    // Puzzle/Integration icons
    case 'puzzle':
    case 'integration':
      return <Puzzle className={className} />;
    
    // Security icons
    case 'lock':
    case 'security':
      return <Lock className={className} />;
    
    // Performance icons
    case 'zap':
    case 'lightning':
    case 'performance':
      return <Zap className={className} />;
    
    // Time/Schedule icons
    case 'clock':
    case 'time':
    case 'schedule':
      return <Clock className={className} />;
    
    // Chart icons
    case 'chart':
    case 'bar-chart':
    case 'chart-bar':
      return <BarChart className={className} />;
    case 'line-chart':
    case 'chart-line':
      return <LineChart className={className} />;
    
    // Layout/UI icons
    case 'layout':
    case 'mockup':
    case 'ui':
      return <Layout className={className} />;
    
    // Communication icons
    case 'message':
    case 'message-square':
      return <MessageSquare className={className} />;
    case 'messages':
    case 'messages-square':
      return <MessagesSquare className={className} />;
    
    // Iteration/Repeat icons
    case 'repeat':
    case 'iteration':
    case 'cycle':
      return <Repeat className={className} />;
    
    // List/Tasks icons
    case 'list-checks':
    case 'checklist':
    case 'tasks':
      return <ListChecks className={className} />;
    
    // Device icons
    case 'laptop':
    case 'computer':
      return <Laptop className={className} />;
    
    // User check icons
    case 'user-check':
    case 'user-verify':
      return <UserCheck className={className} />;
    
    // Default fallback
    default:
      return <Target className={className} />;
  }
};