import sys
import io
import traceback
import math

class ScopedPythonSandbox:
    """Scoped, sandboxed Python code execution engine for refinery calculations."""

    @staticmethod
    def execute(code_str: str) -> dict:
        stdout_capture = io.StringIO()
        stderr_capture = io.StringIO()

        safe_builtins = {
            "abs": abs,
            "min": min,
            "max": max,
            "sum": sum,
            "len": len,
            "range": range,
            "dict": dict,
            "list": list,
            "float": float,
            "int": int,
            "str": str,
            "round": round,
            "print": lambda *args, **kwargs: print(*args, file=stdout_capture, **kwargs)
        }

        safe_globals = {
            "__builtins__": safe_builtins,
            "math": math
        }
        safe_locals = {}

        old_stdout = sys.stdout
        sys.stdout = stdout_capture

        try:
            exec(code_str, safe_globals, safe_locals)
            sys.stdout = old_stdout
            output = stdout_capture.getvalue()
            return {
                "status": "success",
                "output": output if output.strip() else "Execution completed with no printed output.",
                "variables": {k: v for k, v in safe_locals.items() if not k.startswith("__") and isinstance(v, (int, float, str, list, dict))}
            }
        except Exception as e:
            sys.stdout = old_stdout
            error_trace = traceback.format_exc()
            return {
                "status": "error",
                "output": stdout_capture.getvalue(),
                "error": str(e),
                "traceback": error_trace
            }
