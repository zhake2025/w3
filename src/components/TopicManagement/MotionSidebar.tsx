import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react';
import SidebarTabs from './SidebarTabs';
import { useDialogBackHandler } from '../../hooks/useDialogBackHandler';

// 侧边栏的唯一标识符，用于返回按键处理
const SIDEBAR_DIALOG_ID = 'sidebar-drawer';

interface MotionSidebarProps {
  mobileOpen?: boolean;
  onMobileToggle?: () => void;
  mcpMode?: 'prompt' | 'function';
  toolsEnabled?: boolean;
  onMCPModeChange?: (mode: 'prompt' | 'function') => void;
  onToolsToggle?: (enabled: boolean) => void;
  // 新增：支持桌面端收起功能
  desktopOpen?: boolean;
  onDesktopToggle?: () => void;
}

// 自定义比较函数，只比较关键props - 更精确的比较
const areMotionSidebarPropsEqual = (prevProps: MotionSidebarProps, nextProps: MotionSidebarProps) => {
  const result = (
    prevProps.mobileOpen === nextProps.mobileOpen &&
    prevProps.desktopOpen === nextProps.desktopOpen &&
    prevProps.mcpMode === nextProps.mcpMode &&
    prevProps.toolsEnabled === nextProps.toolsEnabled
  );

  // 🔧 调试日志：记录比较结果
  if (!result) {
    console.log('🔄 MotionSidebar props变化，需要重新渲染', {
      mobileOpen: { prev: prevProps.mobileOpen, next: nextProps.mobileOpen },
      desktopOpen: { prev: prevProps.desktopOpen, next: nextProps.desktopOpen },
      mcpMode: { prev: prevProps.mcpMode, next: nextProps.mcpMode },
      toolsEnabled: { prev: prevProps.toolsEnabled, next: nextProps.toolsEnabled }
    });
  }

  return result;
};

// 使用 React.memo 优化组件，避免不必要的重新渲染
const MotionSidebar = React.memo(function MotionSidebar({
  mobileOpen = false,
  onMobileToggle,
  mcpMode,
  toolsEnabled,
  onMCPModeChange,
  onToolsToggle,
  // 新增参数
  desktopOpen = true,
  onDesktopToggle
}: MotionSidebarProps) {
  // 🔧 渲染计数器，监控重复渲染
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log(`🎬 MotionSidebar渲染 #${renderCount.current}`, { mobileOpen, desktopOpen });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // 与ChatPageUI保持一致
  const [showSidebar, setShowSidebar] = useState(!isSmallScreen);

  const drawerWidth = 320;

  useEffect(() => {
    if (isSmallScreen) {
      setShowSidebar(false);
    }
  }, [isSmallScreen]);

  // 使用 useRef 来稳定回调函数引用，避免无限重新渲染
  const onMobileToggleRef = useRef(onMobileToggle);
  const onDesktopToggleRef = useRef(onDesktopToggle);

  // 更新 ref 的值
  useEffect(() => {
    onMobileToggleRef.current = onMobileToggle;
  }, [onMobileToggle]);

  useEffect(() => {
    onDesktopToggleRef.current = onDesktopToggle;
  }, [onDesktopToggle]);

  // 优化：使用稳定的计算逻辑，避免回调函数依赖导致的重新渲染
  const finalOpen = useMemo(() => {
    if (isSmallScreen) {
      return onMobileToggleRef.current ? mobileOpen : showSidebar;
    } else {
      return onDesktopToggleRef.current ? desktopOpen : showSidebar;
    }
  }, [isSmallScreen, mobileOpen, showSidebar, desktopOpen]);

  // 统一的关闭处理函数
  const handleClose = useCallback(() => {
    if (isSmallScreen) {
      // 移动端：优先使用 onMobileToggle，否则使用本地状态
      if (onMobileToggleRef.current) {
        onMobileToggleRef.current();
      } else {
        setShowSidebar(false);
      }
    } else {
      // 桌面端：优先使用 onDesktopToggle，否则使用本地状态
      if (onDesktopToggleRef.current) {
        onDesktopToggleRef.current();
      } else {
        setShowSidebar(false);
      }
    }
  }, [isSmallScreen]);

  // 使用返回按键处理Hook，只在移动端且侧边栏打开时启用
  useDialogBackHandler(
    SIDEBAR_DIALOG_ID,
    isSmallScreen && finalOpen, // 使用统一的 finalOpen 状态
    handleClose // 使用统一的关闭处理函数
  );



  // 优化：减少 drawer 的依赖项，避免频繁重新渲染
  const drawer = useMemo(() => (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      // 自定义滚动条样式
      '&::-webkit-scrollbar': {
        width: '1px', // 故意设计为1px以隐藏滚动条
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '3px',
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.3)',
        },
      },
      // Firefox 滚动条样式
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
    }}>
      {(isSmallScreen || onDesktopToggle) && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          minHeight: 48,
          alignItems: 'center',
        }}>
          <IconButton
            onClick={handleClose}
            sx={{
              transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
              // 移动端优化
              '@media (hover: none)': {
                '&:hover': {
                  backgroundColor: 'transparent',
                  transform: 'none',
                },
                '&:active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  transform: 'scale(0.95)',
                },
              },
            }}
          >
            <CloseIcon size={20} />
          </IconButton>
        </Box>
      )}
      <SidebarTabs
        mcpMode={mcpMode}
        toolsEnabled={toolsEnabled}
        onMCPModeChange={onMCPModeChange}
        onToolsToggle={onToolsToggle}
      />
    </Box>
  ), [isSmallScreen, handleClose, mcpMode, toolsEnabled, onMCPModeChange, onToolsToggle, onDesktopToggle]);

  if (isSmallScreen) {
    // 🚀 移动端：高性能Drawer + 简化手势支持
    return (
      <>
        {/* 🚀 高性能边缘滑动区域 - 替代SwipeableDrawer */}
        {!finalOpen && (
          <Box
            sx={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: 15, // 减少触发区域宽度，从30px减少到15px，降低误触概率
              height: '100vh',
              zIndex: 1300,
              backgroundColor: 'transparent',
              // 🔧 添加视觉提示
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 2, // 相应减少视觉提示宽度
                height: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '0 2px 2px 0',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              },
              '&:active::after': {
                opacity: 1,
              }
            }}
            onTouchStart={(e) => {
              // 🚀 优化的手势检测 - 添加输入框检测逻辑
              const touch = e.touches[0];
              
              // 检查触摸点是否在缩小的触发区域内
              if (touch.clientX > 15) return;
              
              // 🔧 新增：检测是否在输入框或文本区域内操作
              const target = e.target as HTMLElement;
              const isInputElement = target.tagName === 'INPUT' || 
                                   target.tagName === 'TEXTAREA' || 
                                   target.contentEditable === 'true' ||
                                   target.closest('input') ||
                                   target.closest('textarea') ||
                                   target.closest('[contenteditable="true"]') ||
                                   target.closest('[role="textbox"]');
              
              // 如果在输入框内操作，不触发侧边栏
              if (isInputElement) {
                console.log('📱 检测到输入框操作，跳过侧边栏触发');
                return;
              }
              
              // 🔧 新增：检测是否在聊天输入区域
              const isChatInputArea = target.closest('.chat-input-container') ||
                                    target.closest('[data-testid="chat-input"]') ||
                                    target.closest('.MuiInputBase-root');
              
              if (isChatInputArea) {
                console.log('📱 检测到聊天输入区域操作，跳过侧边栏触发');
                return;
              }
              
              // 🔧 新增：增加触摸时长检测，避免快速滑动误触
              const touchStartTime = Date.now();
              
              const handleTouchEnd = () => {
                const touchDuration = Date.now() - touchStartTime;
                // 只有触摸时长超过100ms才认为是有意的边缘滑动
                if (touchDuration > 100) {
                  console.log('📱 移动端边缘滑动触发');
                  if (onMobileToggleRef.current) {
                    onMobileToggleRef.current();
                  } else {
                    setShowSidebar(true);
                  }
                }
                // 清理事件监听器
                document.removeEventListener('touchend', handleTouchEnd);
              };
              
              // 添加临时的touchend监听器
              document.addEventListener('touchend', handleTouchEnd, { once: true });
            }}
          />
        )}

        <Drawer
          variant="temporary"
          anchor="left"
          open={finalOpen}
          onClose={handleClose}
          ModalProps={{
            keepMounted: true, // 保持DOM挂载，提升性能
            disablePortal: false,
            // 🔧 优化背景遮罩性能
            BackdropProps: {
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                // 🚀 使用GPU加速的opacity动画
                transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              }
            },
            // 🔧 移动端性能优化
            disableScrollLock: true, // 避免滚动锁定开销
            disableEnforceFocus: true, // 减少焦点管理开销
            disableAutoFocus: true, // 避免自动聚焦开销
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              borderRadius: '0 16px 16px 0',
              boxShadow: theme.shadows[16],
              // 🚀 关键优化：使用transform而不是默认动画
              transform: finalOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
              transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              // 🔧 移动端优化
              willChange: 'transform', // 提示浏览器优化
              backfaceVisibility: 'hidden', // 避免闪烁
            },
          }}
        >
          {drawer}
        </Drawer>
      </>
    );
  }

  // 🚀 桌面端：直接用Box，完全避免Modal层阻挡点击
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: drawerWidth,
        height: '100vh',
        zIndex: 0,
        boxSizing: 'border-box',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        // 🚀 关键优化：使用transform而不是width变化
        transform: finalOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
        transition: theme.transitions.create(['transform'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {drawer}
    </Box>
  );
}, areMotionSidebarPropsEqual);

export default MotionSidebar;
