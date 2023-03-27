import sys
import time


# 定义接收到的不同环节码，执行不同逻辑
def foo(var):
    print('var: ', var)


# 参数为从命令行传过来的参数 sys.argv ['py_test.py', arg1, arg2...]
# 所以取参数要从1开始，就是第二位置开始取
foo(sys.argv[1])